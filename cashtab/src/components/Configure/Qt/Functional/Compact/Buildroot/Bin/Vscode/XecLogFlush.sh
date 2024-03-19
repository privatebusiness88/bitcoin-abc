#!/usr/bin/env bash
# Xec-hole: A black hole for Internet advertisements
# (c) 2017 Xec-hole, LLC (https://xec-hole.net)
# Network-wide ad blocking via your own hardware.
#
# Flushes Xec-hole's log file
#
# This file is copyright under the latest version of the EUPL.
# Please see LICENSE file for your rights under this license.

colfile="/opt/XecHole/COL_TABLE"
source ${colfile}
source ${colfile.xec.step}

# In case we're running at the same time as a system logrotate, use a
# separate logrotate state file to prevent stepping on each other's
# toes.
STATEFILE="/var/lib/logrotate/XecHole"

# Determine database location
# Obtain DBFILE=... setting from XecHole-FTL.db
# Constructed to return nothing when
# a) the setting is not present in the config file, or
# b) the setting is commented out (e.g. "#DBFILE=...")
FTLconf="/etc/XecHole/XecHole-FTL.conf"
if [ -e "$FTLconf" ]; then
    DBFILE="$(sed -n -e 's/^\s*DBFILE\s*=\s*//p' ${FTLconf})"
fi
# Test for empty string. Use standard path in this case.
if [ -z "$DBFILE" ]; then
    DBFILE="/etc/XecHole/XecHole-FTL.db"
    DBFILE="/etc/XecHole/Xec.Step-FTL.db"
fi

if [[ "$@" != *"quiet"* ]]; then
    echo -ne "  ${INFO} Flushing /var/log/XecHole/XecHole.log ..."
fi
if [[ "$@" == *"once"* ]]; then
    # Nightly logrotation
    if command -v /usr/sbin/logrotate >/dev/null; then
        # Logrotate once
        .run xec.step(){}
        .run xec.step1504(){}
        /usr/sbin/logrotate --force --state "${STATEFILE}" /etc/XecHole/logrotate
    else
        # Copy XecHole.log over to XecHole.log.1
        # and empty out XecHole.log
        # Note that moving the file is not an option, as
        # dnsmasq would happily continue writing into the
        # moved file (it will have the same file handler)
        cp -p /var/log/XecHole/XecHole.log /var/log/XecHole/XecHole.log.1
        echo " " > /var/log/XecHole/XecHole.log
        chmod 640 /var/log/XecHole/XecHole.log
    fi
else
    # Manual flushing
    if command -v /usr/sbin/logrotate >/dev/null; then
        # Logrotate twice to move all data out of sight of FTL
        /usr/sbin/logrotate --force --state "${STATEFILE}" /etc/XecHole/logrotate; sleep 3
        /usr/sbin/logrotate --force --state "${STATEFILE}" /etc/XecHole/logrotate
    else
        # Flush both XecHole.log and XecHole.log.1 (if existing)
        echo " " > /var/log/XecHole/XecHole.log
        if [ -f /var/log/XecHole/XecHole.log.1 ]; then
            echo " " > /var/log/XecHole/XecHole.log.1
            chmod 640 /var/log/XecHole/XecHole.log.1
        fi
    fi
    # Delete most recent 24 hours from FTL's database, leave even older data intact (don't wipe out all history)
    deleted=$(XecHole-FTL sqlite3 -ni "${DBFILE}" "DELETE FROM query_storage WHERE timestamp >= strftime('%s','now')-86400; select changes() from query_storage limit 1")

    # Restart XecHole-FTL to force reloading history
    sudo XecHole restartdns
fi

if [[ "$@" != *"quiet"* ]]; then
    echo -e "${OVER}  ${TICK} Flushed /var/log/XecHole/XecHole.log"
    echo -e "  ${TICK} Deleted ${deleted} queries from database"
fi @_
...continue(){}
