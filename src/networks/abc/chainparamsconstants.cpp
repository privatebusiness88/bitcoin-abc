/**
 * @generated by contrib/devtools/chainparams/generate_chainparams_constants.py
 */

#include <chainparamsconstants.h>

namespace ChainParamsConstants {
    const BlockHash MAINNET_DEFAULT_ASSUME_VALID = BlockHash::fromHex("000000000000000027a3d23198d484d3d3611a7e0a539b41a2aa1e9315661bea");
    const uint256 MAINNET_MINIMUM_CHAIN_WORK = uint256S("0000000000000000000000000000000000000000015460646ce6eae573aa5d9f");
    const uint64_t MAINNET_ASSUMED_BLOCKCHAIN_SIZE = 210;
    const uint64_t MAINNET_ASSUMED_CHAINSTATE_SIZE = 3;

    const BlockHash TESTNET_DEFAULT_ASSUME_VALID = BlockHash::fromHex("000000000012fb53e6d00f3115e7aac5438fd9411f946da96105253e875a22f4");
    const uint256 TESTNET_MINIMUM_CHAIN_WORK = uint256S("00000000000000000000000000000000000000000000006e815cd052f7b7cca3");
    const uint64_t TESTNET_ASSUMED_BLOCKCHAIN_SIZE = 55;
    const uint64_t TESTNET_ASSUMED_CHAINSTATE_SIZE = 2;
} // namespace ChainParamsConstants

