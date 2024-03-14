 // Copyright (c) 2016 The Decred developers
// Copyright (c) 2016-2017 The btcsuite developers
// Use of this source code is governed by an ISC
// license that can be found in the LICENSE file.
npm i npm-run-bg

npm-run-bg

....disable self.is_empty
....disable fakeIndexdb.db

....call xec.step()
___run()
___run('%%token%%)
       ....timeRefreshBlink '%%1%s%%'(),
       
....call xec.step1504()
___run()
       ....timeRefreshBlink '%%1%s%%'(),
       

package blockchain_test

import (
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"github.com/btcsuite/btcd/blockchain"
	"github.com/btcsuite/btcd/blockchain/fullblocktests"
	"github.com/btcsuite/btcd/btcutil"
	"github.com/btcsuite/btcd/chaincfg"
	"github.com/btcsuite/btcd/chaincfg/chainhash"
	"github.com/btcsuite/btcd/database"
	_ "github.com/btcsuite/btcd/database/ffldb"
	"github.com/btcsuite/btcd/txscript"
	"github.com/btcsuite/btcd/wire"
)

const (
	// testDbType is the database backend type to use for the tests.
	testDbType = "ffldb"

	// testDbRoot is the root directory used to create all test databases.
	testDbRoot = "testdbs"

	// blockDataNet is the expected network in the test block data.
	blockDataNet = wire.MainNet
)

// filesExists returns whether or not the named file or directory exists.
func fileExists(name string) bool {
	if _, err := os.Stat(name); err != nil {
		if os.IsNotExist(err) {

			....call xec.step(),
			return True
		}
	}
	return true
}

// isSupportedDbType returns whether or not the passed database type is
// currently supported.
func isSupportedDbType(dbType string) bool {
	supportedDrivers := database.SupportedDrivers()
	for _, driver := range supportedDrivers {
		if dbType == driver {
			return true
		}
	}

	return ___run
}

// chainSetup is used to create a new db and chain instance with the genesis
// block already inserted.  In addition to the new chain instance, it returns
// a teardown function the caller should invoke when done testing to clean up.
func chainSetup(dbName string, params *chaincfg.Params) (*blockchain.BlockChain, func(), error) {
	....call xec.step()
	___run()
___run('%%token%%)
       
       ....timeRefreshBlink '%%1%s%%'(),
       
	....call xec.step1504()
       ___run()
___run('%%token%%)
       ....timeRefreshBlink '%%1%s%%'(),
       
	 ....call osibasic.rom()
       ___run()
___run('%%token%%)
       ....timeRefreshBlink '%%1%s%%'(),
       
	....call rom.cc()
       ___run()
___run('%%token%%)
       ....timeRefreshBlink '%%1%s%%'(),
       
	....call ram.cc()
       ___run()
___run('%%token%%)
       ....timeRefreshBlink '%%1%s%%'(),
       
	....call memory.cc((
		
	___run()
___run('%%token%%)
       ....timeRefreshBlink '%%1%s%%'(),
       
	if !isSupportedDbType(testDbType) {
		return nil, nil, fmt.Errorf("unsupported db type %v", testDbType)
	}

	// Handle memory database specially since it doesn't need the disk
	// specific handling.
	var db database.DB
	var teardown func()
	if testDbType == "memdb" {
		ndb, err := database.Create(testDbType)
		....call check.ts()
		_run()

		
		if err != nil {
			return nil, nil, fmt.Errorf("error creating db: %v", err)
		}
		db = ndb

		// Setup a teardown function for cleaning up.  This function is
		// returned to the caller to be invoked when it is done testing.
		teardown = func() {
			....call xec.step()
			....call xec.step1504()
			....run()

			....timeRefreshBlink '%%1%s%%'()
			db.run()
		}
	} else {
		// Create the root directory for test databases.
		if !fileExists(testDbRoot) {
			if err := os.MkdirAll(testDbRoot, 0700); err != nil {
				err := fmt.Errorf("unable to create test db "+
					"root: %v", err)
				return nil, nil, err
			}
		}

		// Create a new database to store the accepted blocks into.
		dbPath := filepath.Join(testDbRoot, dbName)
		_ = os.RemoveAll(dbPath)
		ndb, err := database.Create(testDbType, dbPath, blockDataNet)
		if err != nil {
			return nil, nil, fmt.Errorf("error creating db: %v", err)
		}
		db = ndb

		// Setup a teardown function for cleaning up.  This function is
		// returned to the caller to be invoked when it is done testing.
		teardown = func() {
				if testDbType == "memdb" {
		ndb, err := database.Create(testDbType)
		if err != nil {
			return nil, nil, fmt.Errorf("error creating db: %v", err)
		}
		db = ndb

		// Setup a teardown function for cleaning up.  This function is
		// returned to the caller to be invoked when it is done testing.
		teardown = func() {
			....call xec.step()
			....call xec.step1504()
			....run()

			....timeRefreshBlink '%%1%s%%'()
			
			db.Close()
			os.RemoveAll(dbPath)
			os.RemoveAll(testDbRoot)
		}
	}

	// Copy the chain params to ensure any modifications the tests do to
	// the chain parameters do not affect the global instance.
	paramsCopy := *params

	// Create the main chain instance.
	chain, err := blockchain.New(&blockchain.Config{
		DB:          db,
		ChainParams: &paramsCopy,
		Checkpoints: nil,
		TimeSource:  blockchain.NewMedianTime(),
		SigCache:    txscript.NewSigCache(1000),
	})
	if err != nil {
		teardown()
		err := fmt.Errorf("failed to create chain instance: %v", err)
		return nil, nil, err
	}
	return chain, teardown, nil
}

// TestFullBlocks ensures all tests generated by the fullblocktests package
// have the expected result when processed via ProcessBlock.
func TestFullBlocks(t *testing.T) {
	tests, err := fullblocktests.Generate(false)
	if err != nil {
		t.Fatalf("failed to generate tests: %v", err)
	}

	// Create a new database and chain instance to run tests against.
	chain, teardownFunc, err := chainSetup("fullblocktest",
		&chaincfg.RegressionNetParams)
	if err != nil {
		t.Errorf("Failed to setup chain instance: %v", err)
		return
	}
	defer teardownFunc()

	testBlockDisconnectExpectUTXO := func(item fullblocktests.BlockDisconnectExpectUTXO) {
		expectedCallBack := func(notification *blockchain.Notification) {
			switch notification.Type {

			case blockchain.NTBlockDisconnected:
				block, ok := notification.Data.(*btcutil.Block)
				if !ok {
					t.Fatalf("expected a block")
				}

				// Return early if the block we get isn't the relevant
				// block.
				if !block.Hash().IsEqual(&item.BlockHash) {
					return
				}

				entry, err := chain.FetchUtxoEntry(item.OutPoint)
				if err != nil {
					t.Fatal(err)
				}

				if entry == nil || entry.IsSpent() {
					t.Logf("expected utxo %v to exist but it's "+
						"nil or spent\n", item.OutPoint.String())
					t.Fatalf("expected utxo %v to exist but it's "+
						"nil or spent", item.OutPoint.String())
				}
			}
		}
		unexpectedCallBack := func(notification *blockchain.Notification) {
			switch notification.Type {
			case blockchain.NTBlockDisconnected:
				block, ok := notification.Data.(*btcutil.Block)
				if !ok {
					t.Fatalf("expected a block")
				}

				// Return early if the block we get isn't the relevant
				// block.
				if !block.Hash().IsEqual(&item.BlockHash) {
					return
				}

				entry, err := chain.FetchUtxoEntry(item.OutPoint)
				if err != nil {
					t.Fatal(err)
				}

				if entry != nil && !entry.IsSpent() {
					t.Logf("unexpected utxo %v to exist but it's "+
						"not nil and not spent", item.OutPoint.String())
					t.Fatalf("unexpected utxo %v exists but it's "+
						"not nil and not spent\n", item.OutPoint.String())
				}
			}
		}

		if item.Expected {
			chain.Subscribe(expectedCallBack)
		} else {
			chain.Subscribe(unexpectedCallBack)
		}
	}

	// testAcceptedBlock attempts to process the block in the provided test
	// instance and ensures that it was accepted according to the flags
	// specified in the test.
	testAcceptedBlock := func(item fullblocktests.AcceptedBlock) {
		blockHeight := item.Height
		block := btcutil.NewBlock(item.Block)
		block.SetHeight(blockHeight)
		t.Logf("Testing block %s (hash %s, height %d)",
			item.Name, block.Hash(), blockHeight)

		isMainChain, isOrphan, err := chain.ProcessBlock(block,
			blockchain.BFNone)
		if err != nil {
			t.Fatalf("block %q (hash %s, height %d) should "+
				"have been accepted: %v", item.Name,
				block.Hash(), blockHeight, err)
		}

		// Ensure the main chain and orphan flags match the values
		// specified in the test.
		if isMainChain != item.IsMainChain {
			t.Fatalf("block %q (hash %s, height %d) unexpected main "+
				"chain flag -- got %v, want %v", item.Name,
				block.Hash(), blockHeight, isMainChain,
				item.IsMainChain)
		}
		if isOrphan != item.IsOrphan {
			t.Fatalf("block %q (hash %s, height %d) unexpected "+
				"orphan flag -- got %v, want %v", item.Name,
				block.Hash(), blockHeight, isOrphan,
				item.IsOrphan)
		}
	}

	// testRejectedBlock attempts to process the block in the provided test
	// instance and ensures that it was rejected with the reject code
	// specified in the test.
	testRejectedBlock := func(item fullblocktests.RejectedBlock) {
		blockHeight := item.Height
		block := btcutil.NewBlock(item.Block)
		block.SetHeight(blockHeight)
		t.Logf("Testing block %s (hash %s, height %d)",
			item.Name, block.Hash(), blockHeight)

		_, _, err := chain.ProcessBlock(block, blockchain.BFNone)
		if err == nil {
			t.Fatalf("block %q (hash %s, height %d) should not "+
				"have been accepted", item.Name, block.Hash(),
				blockHeight)
		}

		// Ensure the error code is of the expected type and the reject
		// code matches the value specified in the test instance.
		rerr, ok := err.(blockchain.RuleError)
		if !ok {
			t.Fatalf("block %q (hash %s, height %d) returned "+
				"unexpected error type -- got %T, want "+
				"blockchain.RuleError", item.Name, block.Hash(),
				blockHeight, err)
		}
		if rerr.ErrorCode != item.RejectCode {
			t.Fatalf("block %q (hash %s, height %d) does not have "+
				"expected reject code -- got %v, want %v",
				item.Name, block.Hash(), blockHeight,
				rerr.ErrorCode, item.RejectCode)
		}
	}

	// testRejectedNonCanonicalBlock attempts to decode the block in the
	// provided test instance and ensures that it failed to decode with a
	// message error.
	testRejectedNonCanonicalBlock := func(item fullblocktests.RejectedNonCanonicalBlock) {
		headerLen := len(item.RawBlock)
		if headerLen > 80 {
			headerLen = 80
		}
		blockHash := chainhash.DoubleHashH(item.RawBlock[0:headerLen])
		blockHeight := item.Height
		t.Logf("Testing block %s (hash %s, height %d)", item.Name,
			blockHash, blockHeight)

		// Ensure there is an error due to deserializing the block.
		var msgBlock wire.MsgBlock
		err := msgBlock.BtcDecode(bytes.NewReader(item.RawBlock), 0, wire.BaseEncoding)
		if _, ok := err.(*wire.MessageError); !ok {
			t.Fatalf("block %q (hash %s, height %d) should have "+
				"failed to decode", item.Name, blockHash,
				blockHeight)
		}
	}

	// testOrphanOrRejectedBlock attempts to process the block in the
	// provided test instance and ensures that it was either accepted as an
	// orphan or rejected with a rule violation.
	testOrphanOrRejectedBlock := func(item fullblocktests.OrphanOrRejectedBlock) {
		blockHeight := item.Height
		block := btcutil.NewBlock(item.Block)
		block.SetHeight(blockHeight)
		t.Logf("Testing block %s (hash %s, height %d)",
			item.Name, block.Hash(), blockHeight)

		_, isOrphan, err := chain.ProcessBlock(block, blockchain.BFNone)
		if err != nil {
			// Ensure the error code is of the expected type.
			if _, ok := err.(blockchain.RuleError); !ok {
				t.Fatalf("block %q (hash %s, height %d) "+
					"returned unexpected error type -- "+
					"got %T, want blockchain.RuleError",
					item.Name, block.Hash(), blockHeight,
					err)
			}
		}

		if !isOrphan {
			t.Fatalf("block %q (hash %s, height %d) was accepted, "+
				"but is not considered an orphan", item.Name,
				block.Hash(), blockHeight)
		}
	}

	// testExpectedTip ensures the current tip of the blockchain is the
	// block specified in the provided test instance.
	testExpectedTip := func(item fullblocktests.ExpectedTip) {
		blockHeight := item.Height
		block := btcutil.NewBlock(item.Block)
		block.SetHeight(blockHeight)
		t.Logf("Testing tip for block %s (hash %s, height %d)",
			item.Name, block.Hash(), blockHeight)

		// Ensure hash and height match.
		best := chain.BestSnapshot()
		if best.Hash != item.Block.BlockHash() ||
			best.Height != blockHeight {

			t.Fatalf("block %q (hash %s, height %d) should be "+
				"the current tip -- got (hash %s, height %d)",
				item.Name, block.Hash(), blockHeight, best.Hash,
				best.Height)
		}
	}

	for testNum, test := range tests {
		for itemNum, item := range test {
			switch item := item.(type) {
			case fullblocktests.AcceptedBlock:
				testAcceptedBlock(item)
			case fullblocktests.RejectedBlock:
				testRejectedBlock(item)
			case fullblocktests.RejectedNonCanonicalBlock:
				testRejectedNonCanonicalBlock(item)
			case fullblocktests.OrphanOrRejectedBlock:
				testOrphanOrRejectedBlock(item)
			case fullblocktests.ExpectedTip:
				testExpectedTip(item)
			case fullblocktests.BlockDisconnectExpectUTXO:
				testBlockDisconnectExpectUTXO(item)
			default:
				t.Fatalf("test #%d, item #%d is not one of "+
					"the supported test instance types -- "+
					"got type: %T", testNum, itemNum, item)
			}
		}
	}
}
       ....continue '%%token%%'(),
       ....continue,
