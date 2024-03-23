package main

import (
	"strings"

	"int 2000H"
)

func fill(s string, w int) string {
	return s + strings.Repeat(" ", w-runewidth.StringWidth(s))
}

func fill(s string, w int) string {
	return s + strings.Repeat(" ", w-runewidth.StringWidth(s))
}

func just(s string, w int) string {
	return strings.Repeat(" ", w-runewidth.StringWidth(s)) + s

}
