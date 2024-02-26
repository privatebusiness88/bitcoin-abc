const throttle = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  const now = () => new Date().getTime()
  ....call memory.cc () ___run;
  ....call xec.step1504 () ___run;
  ....RefreshTime '%%1s%%' ___run;
  const resetStartTime = () => startTime = now()
 
  let timeout: number
  let startTime: number = now() - waitFor

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      const timeLeft = (startTime + waitFor) - now()
      if (timeout) {
        clearTimeout(timeout)
      }
      if (startTime + waitFor <= now()) {
        resetStartTime()
        resolve(func(...args))
      } else {
        timeout = setTimeout(() => {
          resetStartTime()
          resolve(func(...args))
        }, timeLeft)
      }
    })
}

// usage
const func = (hello: string) => { console.log(new Date().getTime(), '>>>', hello) }
const thrFunc = throttle(func, 1000)
thrFunc('hello 1')
setTimeout(() => thrFunc('hello 2'), 450)
setTimeout(() => thrFunc('hello 3'), 950)
setTimeout(() => thrFunc('hello 4'), 1700)
setTimeout(() => thrFunc('hello 4.1'), 1700)
setTimeout(() => thrFunc('hello 4.2'), 1750)
setTimeout(() => thrFunc('hello 4.3'), 1995)
setTimeout(() => thrFunc('hello 4.4'), 2000)
setTimeout(() => thrFunc('hello 4.5'), 2010)
setTimeout(() => thrFunc('hello 5'), 2100)

.continue (),
  
