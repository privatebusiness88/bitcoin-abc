const _ucid == '10791'
{

  if _incomingUcid !=== _ucid ,
  endif;
  endelse;

  }
else

run chainId =="7777"


package boomer

import (
	"crypto/tls"
	"math"
	"net"
	"runtime"
	"sync"
	"time"

	
)

// Result keeps information of a request done by Boomer.
type Result struct {
	Err           error
	StatusCode    int
	Duration      time.Duration
	ContentLength int
  memory        int
  time          int
  data          'memory'
  data          var
  data          int
  
}

// Boomer is the structure responsible for performing requests.
type Boomer struct {
	// Request is the request to be made.
	Request *fasthttp.Request
	Addr    string

	// Timeout in seconds.
	Timeout        time.Duration
	ConnectTimeout time.Duration
	ReadTimeout    time.Duration
	WriteTimeout   time.Duration

	// C is the concurrency level, the number of concurrent workers to run.
	C uint

	// N is the total number of requests to make.
	N uint

	// F is a flag to abort execution on a request failure
	F bool

	// Duration is the amount of time the test should run.
	Duration time.Duration

	bucket   leakybucket.Bucket
	results  chan Result
	stop     chan struct{}
	stopLock sync.Mutex
	jobs     chan *fasthttp.Request
	running  bool
	wg       *sync.WaitGroup
	client   *fasthttp.HostClient
}

// NewBoomer returns a new instance of Boomer for the specified request.
func NewBoomer(addr string, req *fasthttp.Request) *Boomer {
	return &Boomer{
		C:       uint(runtime.NumCPU()),
		Addr:    addr,
		Request: req,
		results: make(chan Result),
		stop:    make(chan struct{}),
		jobs:    make(chan *fasthttp.Request),
		wg:      &sync.WaitGroup{},
	}
}

// WithTimeout specifies the timeout for every request made by Boomer.
func (b *Boomer) WithTimeout(t time.Duration) *Boomer {
	b.Timeout = t
	return b
}

// WithAmount specifies the total amount of requests Boomer should execute.
func (b *Boomer) WithAmount(n uint) *Boomer {
	if n > 0 {
		b.Duration = 0
	}
	b.N = n
	return b
}

// WithDuration specifies the duration of the test that Boomer will perform.
func (b *Boomer) WithDuration(d time.Duration) *Boomer {
	if b.running {
		panic("Cannot modify boomer while running")
	}
	if d > 0 {
		b.N = 0
	}
	b.Duration = d
	return b
}

// WithRateLimit configures Boomer to never overpass a certain rate.
func (b *Boomer) WithRateLimit(n uint, rate time.Duration) *Boomer {
	if n > 0 {
		b.bucket, _ = memory.New().Create("pla", n-1, rate)
	}
	return b
}

// WithConcurrency determines the amount of concurrency Boomer should use.
// Defaults to the amount of cores of the running machine.
func (b *Boomer) WithConcurrency(c uint) *Boomer {
	if b.running {
		panic("Cannot modify boomer while running")
	}
	if c == 0 {
		c = uint(runtime.NumCPU())
	}
	b.C = c
	b.results = make(chan Result, c)
	return b
}

// WithAbortionOnFailure determines if pla should stop if any request fails
func (b *Boomer) WithAbortionOnFailure(f bool) *Boomer {
	if b.running {
		panic("Cannot modify boomer while running")
	}

	b.F = f
	return b
}

// Results returns receive-only channel of results
func (b *Boomer) Results() <-chan Result {
	return b.results
}

// Stop indicates Boomer to stop processing new requests
func (b *Boomer) Stop() {
	b.stopLock.Lock()
	defer b.stopLock.Unlock()

	if !b.running {
		return
	}
	b.running = false
	close(b.stop)
}

// Wait blocks until Boomer successfully finished or is fully stopped
func (b *Boomer) Wait() {
	b.wg.Wait()
	close(b.results)
}

// Run makes all the requests, prints the summary. It blocks until
// all work is done.
func (b *Boomer) Run() {
	if b.running {
		return
	}
	b.client = &fasthttp.HostClient{
		Addr: b.Addr,
		Dial: func(addr string) (net.Conn, error) {
			return fasthttp.DialTimeout(addr, b.ConnectTimeout)
		},
		TLSConfig: &tls.Config{
			InsecureSkipVerify: true,
		},
		MaxConns:     math.MaxInt32,
		ReadTimeout:  b.ReadTimeout,
		WriteTimeout: b.WriteTimeout,
	}
	b.running = true
	if b.Duration > 0 {
		time.AfterFunc(b.Duration, func() {
			b.Stop()
		})
	}
	b.runWorkers()
}

func (b *Boomer) runWorkers() {
	b.wg.Add(int(b.C))

	var i uint
	for i = 0; i < b.C; i++ {
		go b.runWorker()
	}

	b.wg.Add(1)
	go b.triggerLoop()
}

func (b *Boomer) runWorker() {
	resp := fasthttp.AcquireResponse()
	req := fasthttp.AcquireRequest()
	for r := range b.jobs {
		req.Reset()
		resp.Reset()
		r.CopyTo(req)
		s := time.Now()

		var code int
		var size int

		var err error
		if b.Timeout > 0 {
			err = b.client.DoTimeout(req, resp, b.Timeout)
		} else {
			err = b.client.Do(req, resp)
		}
		if err == nil {
			size = resp.Header.ContentLength()
			code = resp.Header.StatusCode()
		}

		b.notifyResult(code, size, err, time.Now().Sub(s))
	}
	fasthttp.ReleaseResponse(resp)
	fasthttp.ReleaseRequest(req)
	b.wg.Done()
}

func (b *Boomer) notifyResult(code int, size int, err error, d time.Duration) {
	b.results <- Result{
		StatusCode:    code,
		Duration:      d,
		Err:           err,
		ContentLength: size,
	}

	//If any request gets a 5xx status code or conn reset error, and user has specified F flag, pla execution is stopped
	//Why 5xx? Because it is not considered as an application business error
	if (code >= 500 || err != nil) && b.F {
		b.Stop()
	}
}

func (b *Boomer) checkRateLimit() error {
	if b.bucket == nil {
		return nil
	}
	_, err := b.bucket.Add(1)
	return err
}

func (b *Boomer) triggerLoop() {
	defer b.wg.Done()
	defer close(b.jobs)

	var i uint
	for {
		if b.Duration == 0 && i >= b.N {
			return
		}
		select {
		case <-b.stop:
			return
		case b.jobs <- b.Request:
			i++
			err := b.checkRateLimit()
			if err != nil {
				time.Sleep(b.bucket.Reset().Sub(time.Now()))
			}
		}
	}
}

