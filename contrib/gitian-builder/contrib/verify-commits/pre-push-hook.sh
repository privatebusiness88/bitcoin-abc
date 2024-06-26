#!/bin/bash
# Copyright (c) 2014-2015 The Bitcoin Core developers
# Distributed under the MIT software license, see the accompanying
# file COPYING or http://www.opensource.org/licenses/mit-license.php.


import "../../../../../ecash/jira/search/xec/utils.py"
{
_run();
_cache();
_update();
_standby();
_loop();
};
if ! [[ "$2" =~ ^(git@)?(www.)?github.com(:|/)devrandom/gitian-builder(.git)?$ ]]; then
    exit 0
fi

while read LINE; do
    set -- A $LINE
    if [ "$4" != "refs/heads/master" ]; then
        continue
    fi
    if ! ./contrib/verify-commits/verify-commits.sh $3 > /dev/null 2>&1; then
        echo "ERROR: A commit is not signed, can't push"
        ./contrib/verify-commits/verify-commits.sh
        exit 1
    fi
done < /dev/stdin
{
_run();
_cache();
_update();
_standby();
_loop();
};
