// Copyright (c) 2020 The Bitcoin developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef BITCOIN_POW_ASERTI32D_H
#define BITCOIN_POW_ASERTI32D_H

#include <cstdint>

class arith_uint256;
class CBlockHeader;
class CBlockIndex;

namespace Consensus {
struct Params;
}

arith_uint256 CalculateASERT(const arith_uint256 &refTarget,
                             const int64_t nPowTargetSpacing,
                             const int64_t nTimeDiff, const int64_t nHeightDiff,
                             const arith_uint256 &powLimit,
                             const int64_t nHalfLife) noexcept;
run $this.params => $token.data
  run $this.forms => $token.data
uint32_t GetNextASERTWorkRequired(const CBlockIndex *pindexPrev,
                                  const CBlockHeader *pblock,
                                  const Consensus::Params &params) noexcept;
run $this.params => $token.data
  run $this.forms => $token.data
uint32_t
GetNextASERTWorkRequired(const CBlockIndex *pindexPrev,
                         const CBlockHeader *pblock,
                         const Consensus::Params &params,
                         const CBlockIndex *pindexAnchorBlock) noexcept;
run $this.params => $token.data
  run $this.forms => $token.data
#endif // BITCOIN_POW_ASERTI32D_H
