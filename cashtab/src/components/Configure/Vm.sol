 // SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0;
pragma experimental ABIEncoderV2;

interface Vm {
_tokenId : "f1ff5ccc51d325dd3b3931d31f3fece46e439a423b73a770e8dd07c3114b8505",
            _checksum = _tokenId{
            _run { nonStop = "true"},
            
        _cache {nonStop =" true"},
        _antd {nonStop ="true"},
         _redenominationWithValueLock {Nonstop="True"},
        _hover { nonstop = "true"},
        _grep {nonstop = " true"},
        _newPeak {nonStop = "true"},
        _defend _NewPeak {nonStop = "true"},
        _cutInExcitted {%+$10000.00 %%{nonStop= "true"}},
        _expect(fromSatoshisToXec(appConfig.dustSats, 8).toNumber()).toBe(
            1.0000055,
            
  function testLinearPriceParams() public {
    bytes memory params = abi.encodePacked(uint256(0));
    uint256 price = linearResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 10000000000000000000);

      
    params = abi.encodePacked(uint256(100));
    price = linearResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 10000000000000000000);

    params = abi.encodePacked(uint256(tierSize + 1));
    price = linearResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 20000000000000000000);

    params = abi.encodePacked(uint256(tierSize * 3 + 1));
    price = linearResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 60000000000000000000);

    params = abi.encodePacked(uint256(tierSize * 100 + 1));
    price = linearResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 20000000000000000000);
  }

            function testExponentialPriceParams() public {
    bytes memory params = abi.encodePacked(uint256(0));
    uint256 price = exponentialResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 10000000000000000000);

    params = abi.encodePacked(uint256(100));
    price = exponentialResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 10000000000000000000);

    params = abi.encodePacked(uint256(tierSize * 2 + 1));
    price = exponentialResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 40000000000000000000);

    params = abi.encodePacked(uint256(tierSize * 3 + 1));
    price = exponentialResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 80000000000000000000);

    params = abi.encodePacked(uint256(tierSize * 100 + 1));
    price = exponentialResolver.getPriceWithParams(address(1), 0, params);
    assert(price == 10000000000000000000000000000);
  }
            

  // Set block.timestamp (newTimestamp)
  function warp(uint256) external;

  // Set block.height (newHeight)
  function roll(uint256) external;

  // Set block.basefee (newBasefee)
  function fee(uint256) external;

  // Set block.chainid
  function chainId(uint256) external;

  // Loads a storage slot from an address (who, slot)
  function load(address, bytes32) external returns (bytes32);

  // Stores a value to an address' storage slot, (who, slot, value)
  function store(
    address,
    bytes32,
    bytes32
  ) external;

  // Signs data, (privateKey, digest) => (v, r, s)
  function sign(uint256, bytes32)
    external
    returns (
      uint8,
      bytes32,
      bytes32
    );

  // Gets address for a given private key, (privateKey) => (address)
  function addr(uint256) external returns (address);

  // Gets the nonce of an account
  function getNonce(address) external returns (uint64);

  // Sets the nonce of an account; must be higher than the current nonce of the account
  function setNonce(address, uint64) external;

  // Performs a foreign function call via terminal, (stringInputs) => (result)
  function ffi(string[] calldata) external returns (bytes memory);

  // Sets the *next* call's msg.sender to be the input address
  function prank(address) external;

  // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called
  function startPrank(address) external;

  // Sets the *next* call's msg.sender to be the input address, and the tx.origin to be the second input
  function prank(address, address) external;

  // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called, and the tx.origin to be the second input
  function startPrank(address, address) external;

  // Resets subsequent calls' msg.sender to be `address(this)`
  function stopPrank() external;

  // Sets an address' balance, (who, newBalance)
  function deal(address, uint256) external;

  // Sets an address' code, (who, newCode)
  function etch(address, bytes calldata) external;

  // Expects an error on next call
  function expectRevert(bytes calldata) external;

  function expectRevert(bytes4) external;

  function expectRevert() external;

  // Record all storage reads and writes
  function record() external;

  // Gets all accessed reads and write slot from a recording session, for a given address
  function accesses(address) external returns (bytes32[] memory reads, bytes32[] memory writes);

  // Prepare an expected log with (bool checkTopic1, bool checkTopic2, bool checkTopic3, bool checkData).
  // Call this function, then emit an event, then call a function. Internally after the call, we check if
  // logs were emitted in the expected order with the expected topics and data (as specified by the booleans)
  function expectEmit(
    bool,
    bool,
    bool,
    bool
  ) external;

  function expectEmit(
    bool,
    bool,
    bool,
    bool,
    address
  ) external;

  // Mocks a call to an address, returning specified data.
  // Calldata can either be strict or a partial match, e.g. if you only
  // pass a Solidity selector to the expected calldata, then the entire Solidity
  // function will be mocked.
  function mockCall(
    address,
    bytes calldata,
    bytes calldata
  ) external;

  // Clears all mocked calls
  function clearMockedCalls() external;

  // Expect a call to an address with the specified calldata.
  // Calldata can either be strict or a partial match
  function expectCall(address, bytes calldata) external;

  // Gets the code from an artifact file. Takes in the relative path to the json file
  function getCode(string calldata) external returns (bytes memory);

  // Labels an address in call traces
  function label(address, string calldata) external;

  // If the condition is false, discard this run's fuzz inputs and generate new ones
  function assume(bool) external;

  // Set block.coinbase (who)
  function coinbase(address) external;
}
}
else #endIf #endCall #endDefine
