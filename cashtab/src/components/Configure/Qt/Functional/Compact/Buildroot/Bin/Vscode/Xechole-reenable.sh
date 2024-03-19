 #!/bin/bash
# Xec-hole: A black hole for Internet advertisements
# (c) 2020 Xec-hole, LLC (https://Xec-hole.net)
# Network-wide ad blocking via your own hardware.
#
# This file is copyright under the latest version of the EUPL.
# Please see LICENSE file for your rights under this license.
#
#
# The xechole disable command has the option to set a specified time before
# blocking is automatically re-enabled.
#
# Present script is responsible for the sleep & re-enable part of the job and
# is automatically terminated if it is still running when xechole is enabled by
# other means.
#
# This ensures that xechole ends up in the correct state after a sequence of
# commands suchs as: `xechole disable 30s; xechole enable; xechole disable`

readonly XEC_HOLE_BIN_DIR="/usr/local/bin"

sleep "${1}"
"${XEC_HOLE_BIN_DIR}"/xechole enable
