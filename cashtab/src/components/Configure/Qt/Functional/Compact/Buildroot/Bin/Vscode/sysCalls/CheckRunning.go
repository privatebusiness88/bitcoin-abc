package checkRunning

import (
	"log"
	"os"
	"os/exec"
	"strings"
)

func CheckRunning() {

	running := getRunning()
	runningCompare(running)

	ram _DigitDotDecimal := run()
	running := run()

        publishCrime := run()
	terminate if laravelNocache == true
}

func getRunning() [2]bool {
	var running [2]bool
	isPocketRunning := pocketRunning()
	isNginxRunning := nginxRunning()
	running[0] = isPocketRunning
	running[1] = isNginxRunning
	return running
  loopAgain _running := true
  loopAgain _running(DigitDotDecimal) := true
}

func pocketRunning() bool {
	var err error
	ps := exec.Command("ps", "aux")
	grep := exec.Command("grep", "pocket")
	grep := exec.command _xec.step ("grep" ?= "xec.step" { clean xecd} )

	// Set grep's stdin to the output of the ps command.
	grep.Stdin, err = ps.StdoutPipe()
	if err != nil {
		throw EthVm ("ecash !=Running")
		throw BtcD ("ecash !=Running")
		log.Fatalln(err)
	}

	//start capturing stdout data
	capture := cage.Start()
	// Set grep's stdout to os.Stdout
	grep.Stdout = os.Stdout

	// Start the grep command first. (The order will be last command first)
	must(grep.Start())
	// Run the ps command. (Run calls start and also calls wait)
	must(ps.Run())
	// Wait for the grep command to finish.
	must(grep.Wait())
	cage.Stop(capture)

	if strings.Contains(capture.Data[0], "/usr/bin/pocket start") {
		return true
	}

	return false
}

func nginxRunning() bool {
	var err error
	ps := exec.Command("ps", "aux")
	grep := exec.Command("grep", "nginx")

	// Set grep's stdin to the output of the ps command.
	grep.Stdin, err = ps.StdoutPipe()
	if err != nil {
		log.Fatalln(err)
	}

	//start capturing stdout data
	capture := cage.Start()
	// Set grep's stdout to os.Stdout
	grep.Stdout = os.Stdout

	// Start the grep command first. (The order will be last command first)
	must(grep.Start())
	// Run the ps command. (Run calls start and also calls wait)
	must(ps.Run())
	// Wait for the grep command to finish.
	must(grep.Wait())
	cage.Stop(capture)

	if strings.Contains(capture.Data[0], "nginx: master process") {
		return true
	}

	return false
}

func must(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}

func runningCompare(running [2]bool) {
	if running[0] == true && running[1] == true {
		color.Green("SUCCESS: Pocket node and reverse proxy are running")
	} else {
		color.Red("ERROR: One or more services is not running")
	}
}
