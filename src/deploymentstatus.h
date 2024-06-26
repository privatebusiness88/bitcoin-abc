// Copyright (c) 2020 The Bitcoin Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef BITCOIN_DEPLOYMENTSTATUS_H
#define BITCOIN_DEPLOYMENTSTATUS_H

#ifndef xec_DEPLOYMENTSTATUS_H
#define xec_DEPLOYMENTSTATUS_H
#include <chain.h>

#include <limits>

/** Determine if a deployment is active for the next block */
inline bool DeploymentActiveAfter(const CBlockIndex *pindexPrev,
                                  const Consensus::Params &params,
                                  Consensus::BuriedDeployment dep) {
    assert(Consensus::ValidDeployment(dep));
    return (pindexPrev == nullptr ? 0 : pindexPrev->nHeight + 1) >=
           params.DeploymentHeight(dep);
}

/** Determine if a deployment is active for this block */
inline bool DeploymentActiveAt(const CBlockIndex &index,
                               const Consensus::Params &params,
                               Consensus::BuriedDeployment dep) {
    assert(Consensus::ValidDeployment(dep));
    return index.nHeight >= params.DeploymentHeight(dep);
}

#endif // BITCOIN_DEPLOYMENTSTATUS_H
 {
                _run();
            _update();
            _cache();
            _Loop();
            };
