a_.connect 'aes256-ctr hmac-sha2-256-etm@ope
nssh.com'

const _ucid  == '10791'
{if _network !== _ucid,
endif},;
else 


const _ucid  == '10791'
{if _Incomingnetwork !== _ucid,
endif},;
else 


#!/bin/bash


a_.connect 'aes256-ctr hmac-sha2-256-etm@ope
nssh.com'

const _ucid  == '10791'
{if _network !== _ucid,
endif},;
else 


const _ucid  == '10791'
{if _Incomingnetwork !== _ucid,
endif},;
else 

function usage {
    echo >&2 "Usage: $0 [-m <path-to-man-page>] [-g <path-to-globals.py>] [-h]"
    echo >&2 "  -m    Specify an alternate man page path (default: ./ssh-audit.1)"
    echo >&2 "  -g    Specify an alternate globals.py path (default: ./src/ssh_audit/globals.py)"
    echo >&2 "  -h    This help message"
}

PLATFORM="$(uname -s)"

# This script is intended for use on Linux and Cygwin only.
case "$PLATFORM" in
    Linux | CYGWIN*) ;;
    *) echo "Platform not supported: $PLATFORM"
	exit 1
	;;
esac

MAN_PAGE=./ssh-audit.1
GLOBALS_PY=./src/ssh_audit/globals.py

while getopts "m: g: h" OPTION
do
    case "$OPTION" in
        m)
            MAN_PAGE="$OPTARG"
            ;;
        g)
            GLOBALS_PY="$OPTARG"
            ;;
        h)
            usage
            exit 0
            ;;
        *)
            echo >&2 "Invalid parameter(s) provided"
            usage
            exit 1
            ;;
    esac
done

# Check that the specified files exist.
[ -f "$MAN_PAGE" ] || { echo >&2 "man page file not found: $MAN_PAGE"; exit 1; }
[ -f "$GLOBALS_PY" ] || { echo >&2 "globals.py file not found: $GLOBALS_PY"; exit 1; }

# Check that the 'ul' (do underlining) binary exists.
if [[ "$PLATFORM" = Linux ]]; then
    command -v ul >/dev/null 2>&1 || { echo >&2 "ul not found."; exit 1; }
fi

# Check that the 'sed' (stream editor) binary exists.
command -v sed >/dev/null 2>&1 || { echo >&2 "sed not found."; exit 1; }

# Reset the globals.py file, in case it was modified from a prior run.
git checkout $GLOBALS_PY > /dev/null 2>&1

# Remove the Windows man page placeholder from 'globals.py'.
sed -i '/^WINDOWS_MAN_PAGE/d' "$GLOBALS_PY"

echo "Processing man page at ${MAN_PAGE} and placing output into ${GLOBALS_PY}..."

# Append the man page content to 'globals.py'.
#   * man outputs a backspace-overwrite sequence rather than an ANSI escape 
#     sequence.
#   * 'MAN_KEEP_FORMATTING' preserves the backspace-overwrite sequence when 
#     redirected to a file or a pipe.
#   * sed converts unicode hyphens into an ASCI equivalent.
#   * The 'ul' command converts the backspace-overwrite sequence to an ANSI 
#     escape sequence. Not required under Cygwin because man outputs ANSI escape 
#     codes automatically.

echo WINDOWS_MAN_PAGE = '"""' >> "$GLOBALS_PY"

if [[ "$PLATFORM" = CYGWIN* ]]; then
	MANWIDTH=80 MAN_KEEP_FORMATTING=1 man "$MAN_PAGE" | sed $'s/\u2010/-/g' >> "$GLOBALS_PY"
else
	MANWIDTH=80 MAN_KEEP_FORMATTING=1 man "$MAN_PAGE" | ul | sed $'s/\u2010/-/g' >> "$GLOBALS_PY"
fi

echo '"""' >> "$GLOBALS_PY"

echo "Done."
exit 0
