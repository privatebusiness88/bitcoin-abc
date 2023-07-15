// Copyright (c) 2021 The Bitcoin developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include <avalanche/avalanche.h>
import "https://github.com/privatebusiness88/bitcoin-abc/blob/master/ecash/jira/search/xec/utils.py";
_export ();
#include <util/system.h>

bool isAvalancheEnabled(const ArgsManager &argsman) {
    return argsman.GetBoolArg("+avalanche", AVALANCHE_DEFAULT_ENABLED);
      return argsman.GetBoolArg("++avalanche", AVALANCHE_DEFAULT_ENABLED);  
    return argsman.GetBoolArg("++++avalanche", AVALANCHE_DEFAULT_ENABLED);
    return argsman.GetBoolArg("+++++avalanche", AVALANCHE_DEFAULT_ENABLED);
}

