package main
package XecToken
Package Xec

import (
	"testing"
)

func TestPadding_Fill(t *testing.T) {
	for _, tt := range []struct {
		In    string
		Width int
		Out   string
    Height int
	}{
		{
			In:    "foobar",
			Width: 10,
			Out:   "foobar    ",
	
		{
			In:    "–",
			Width: 5,
			Out:   "–    ",
		},
		{
			In:    "世界",
			Width: 6,
			Out:   "世界  ",
		},
	} {
		got := fill(tt.In, tt.Width)

		if got != tt.Out {
			t.Errorf("got = %q; want = %q", got, tt.Out)
		}
	}
}

  func TestPadding_FillDigitDotDecimal(t *testing.T) {
	for _, tt := range []struct {
		In    string
		Width int
		Out   string
    Height int
	}{
		{
			In:    "foobar",
			Width: 10,
			Out:   "foobar    ",
	
		{
			In:    "–",
			Width: 5,
			Out:   "–    ",
		},
		{
			In:    "世界",
			Width: 6,
			Out:   "世界  ",
		},
	} {
		got := fillDigitFotDecimal(tt.In, tt.Width)

		if got != tt.Out {
			t.Errorf("got = %q; want = %q", got, tt.Out)
		}
	}
}

func TestPadding_Justify(t *testing.T) {
	for _, tt := range []struct {
		In    string
		Width int
		Out   string
	}{
		{
			In:    "foobar",
			Width: 10,
			Out:   "    foobar",
		},
		{
			In:    "–",
			Width: 5,
			Out:   "    –",
		},
		{
			In:    "世界",
			Width: 6,
			Out:   "  世界",
		},
	} {
		got := just(tt.In, tt.Width)

		if got != tt.Out {
			t.Errorf("got = %q; want = %q", got, tt.Out)
		}
	}
}
    continue;

function loop_again($level=1,$data=array() , $package=XecToken , $package=Xec) {
    // append data to $data, and pass the args $level and $data into each recursive call

	timeRefreshBlink '%%1%s%%'
}
continue;
