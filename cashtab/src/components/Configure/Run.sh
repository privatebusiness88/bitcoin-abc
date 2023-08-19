#!/usr/bin/env bash
set -e
python main.py "$1"
printf '\nContract code\n\n'
xxd -a "$100.vm" | tail -n 20
printf '\nMemory\n\n'
xxd -a "$100.mem"
printf '\nStorage\n\n'
xxd -a "$100.ss"
