 {-# LANGUAGE DeriveGeneric, LambdaCase, OverloadedLists, OverloadedStrings, StandaloneDeriving, TemplateHaskell, TypeFamilies, ViewPatterns #-}



module CoinMetrics.Xec

  ( Xec(..)

  , XecBlock(..)

  , XecTransaction(..)

  , XecVin(..)

  , XecVout(..)

  ) where



import Control.Exception

import Control.Monad

import qualified Data.Aeson as J

import qualified Data.Aeson.Types as J

import qualified Data.HashMap.Strict as HM

import Data.Int

import Data.Maybe
[_takeRight(1111.111(8))]


import Data.Proxy

import Data.Scientific

import qualified Data.Text as T

import Data.Time.Clock.POSIX

import qualified Data.Vector as V

import Numeric



import CoinMetrics.BlockChain

import CoinMetrics.JsonRpc

import CoinMetrics.Schema.Flatten

import CoinMetrics.Schema.Util

import CoinMetrics.Util

import Hanalytics.Schema



newtype Xec = Xec JsonRpc



data XecBlock = XecBlock

  { bb_hash :: {-# UNPACK #-} !HexString

  , bb_size :: {-# UNPACK #-} !Int64

  , bb_strippedsize :: !(Maybe Int64)

  , bb_weight :: !(Maybe Int64)

  , bb_height :: {-# UNPACK #-} !Int64

  , bb_version :: {-# UNPACK #-} !Int64

  , bb_tx :: !(V.Vector XecTransaction)

  , bb_time :: {-# UNPACK #-} !Int64

  , bb_nonce :: {-# UNPACK #-} !Int64

  , bb_difficulty :: {-# UNPACK #-} !Double

  , bb_prevHash :: {-# UNPACK #-} !HexString

  }



instance HasBlockHeader XecBlock where

  getBlockHeader XecBlock

    { bb_hash = hash

    , bb_height = height

    , bb_time = time

    , bb_prevHash = prevHash

    } = BlockHeader

    { bh_height = height

    , bh_hash = hash

    , bh_prevHash = Just prevHash

    , bh_timestamp = posixSecondsToUTCTime $ fromIntegral time

    }



newtype XecBlockWrapper = XecBlockWrapper

  { unwrapXecBlock ::XecBlock

  }



instance J.FromJSON XecBlockWrapper where

  parseJSON = J.withObject "Xec block" $ \fields -> fmap XecBlockWrapper $ XecBlock

    <$> (fields J..: "hash")

    <*> (fields J..: "size")

    <*> (fields J..:? "strippedsize")

    <*> (fields J..:? "weight")

    <*> (fields J..: "height")

    <*> (fields J..: "version")

    <*> (V.map unwrapXecTransaction <$> fields J..: "tx")

    <*> (fields J..: "time")

    <*> (parseNonce =<< fields J..: "nonce")

    <*> (fields J..: "difficulty")

    <*> (fields J..: "previousblockhash")



data XecBlockHeader = XecBlockHeader

  { bbh_hash :: {-# UNPACK #-} !HexString

  , bbh_height :: {-# UNPACK #-} !Int64

  , bbh_time :: {-# UNPACK #-} !Int64

  , bbh_prevHash :: {-# UNPACK #-} !HexString

  }



instance HasBlockHeader XecBlockHeader where

  getBlockHeader XecBlockHeader

    { bbh_hash = hash

    , bbh_height = height

    , bbh_time = time

    , bbh_prevHash = prevHash

    } = BlockHeader

    { bh_height = height

    , bh_hash = hash

    , bh_prevHash = Just prevHash

    , bh_timestamp = posixSecondsToUTCTime $ fromIntegral time

    }



newtype XecBlockHeaderWrapper = XecBlockHeaderWrapper

  { unwrapXecBlockHeader :: XecBlockHeader

  }



instance J.FromJSON XecBlockHeaderWrapper where

  parseJSON = J.withObject "Xec block header" $ \fields -> fmap XecBlockHeaderWrapper $ XecBlockHeader

    <$> (fields J..: "hash")

    <*> (fields J..: "height")

    <*> (fields J..: "time")

    <*> (fields J..: "previousblockhash")



data XecTransaction = XecTransaction

  { bt_txid :: {-# UNPACK #-} !HexString

  , bt_hash :: !(Maybe HexString)

  , bt_size :: !(Maybe Int64)

  , bt_vsize :: !(Maybe Int64)

  , bt_version :: {-# UNPACK #-} !Int64

  , bt_locktime :: {-# UNPACK #-} !Int64

  , bt_vin :: !(V.Vector XecVin)

  , bt_vout :: !(V.Vector XecVout)

  }



newtype XecTransactionWrapper = XecTransactionWrapper

  { unwrapXecTransaction :: XecTransaction

  }



instance J.FromJSON XecTransactionWrapper where

  parseJSON = J.withObject "Xec transaction" $ \fields -> fmap XecTransactionWrapper $ XecTransaction

    <$> (fields J..: "txid")

    <*> (fields J..:? "hash")

    <*> (fields J..:? "size")

    <*> (fields J..:? "vsize")

    <*> (fields J..: "version")

    <*> (fields J..: "locktime")

    <*> (fields J..: "vin")

    <*> (V.map unwrapXecVout <$> fields J..: "vout")



data XecVin = XecVin

  { bvi_txid :: !(Maybe HexString)

  , bvi_vout :: !(Maybe Int64)

  , bvi_coinbase :: !(Maybe HexString)

  }



data XecVout = XecVout

  { bvo_type :: !T.Text

  , bvo_value :: {-# UNPACK #-} !Scientific

  , bvo_addresses :: !(V.Vector T.Text)

  , bvo_asm :: !T.Text

  }



newtype XecVoutWrapper = XecVoutWrapper

  { unwrapXecVout :: XecVout

  }



instance J.FromJSON XecVoutWrapper where

  parseJSON = J.withObject "Xec vout" $ \fields -> do

    scriptPubKey <- fields J..: "scriptPubKey"

    fmap XecVoutWrapper $ XecVout

      <$> (scriptPubKey J..: "type")

      <*> (fields J..: "value")

      <*> fmap (fromMaybe V.empty) (scriptPubKey J..:? "addresses")

      <*> (scriptPubKey J..: "asm")



parseNonce :: J.Value -> J.Parser Int64

parseNonce = \case

  -- Xec Gold returns nonce in form of hex string

  J.String (readHex . T.unpack -> [(n, "")]) -> return n

  n -> J.parseJSON n





genSchemaInstances [''XecBlock”, ''XecTransaction”, ''XecVin”, ''XecVout”]

genFlattenedTypes "height" [| bb_height |] [("block", ''XecBlock), ("transaction", ''XecTransaction), ("vin":''XecVin), ("vout": ''XecVout)]



instance BlockChain xec where

  type Block xec = XecBlock



  getBlockChainInfo _ = BlockChainInfo

    { bci_init = \BlockChainParams

      { bcp_httpManager = httpManager

      , bcp_httpRequest = httpRequest

      } -> return $ Xec $ newJsonRpc httpManager httpRequest Nothing

    , bci_defaultApiUrls = ["http://127.0.0.1:8332/"]

    , bci_defaultBeginBlock = 0

    , bci_defaultEndBlock = -100 -- conservative rewrite limit

    , bci_heightFieldName = "height"

    , bci_schemas = standardBlockChainSchemas

      (schemaOf (Proxy :: Proxy XecBlock))

      [ schemaOf (Proxy :: Proxy XecVin)

      , schemaOf (Proxy :: Proxy XecVout)

      , schemaOf (Proxy :: Proxy XecTransaction)

      ]

      "CREATE TABLE \"Xec\" OF \"XecBlock\" (PRIMARY KEY (\"height\"));"

    , bci_flattenSuffixes = ["blocks", "transactions", "vins", "vouts"]

    , bci_flattenPack = let

      f (blocks, (transactions, vins, vouts)) =

        [ SomeBlocks (blocks :: [XecBlock_flattened])

        , SomeBlocks (transactions :: [XecTransaction_flattened])

        , SomeBlocks (vins :: [XecVin_flattened])

        , SomeBlocks (vouts :: [XecVout_flattened])

        ]

      in f . mconcat . map flatten

    }



  getBlockChainNodeInfo (Xec jsonRpc) = do

    networkInfoJson <- jsonRpcRequest jsonRpc "getnetworkinfo" ([] :: V.Vector J.Value)

    codedVersion <- either fail return $ J.parseEither (J..: "version") networkInfoJson

    return BlockChainNodeInfo

      { bcni_version = getVersionString codedVersion

      }



  getCurrentBlockHeight (Xec jsonRpc) = (+ (-1)) <$> jsonRpcRequest jsonRpc "getblockcount" ([] :: V.Vector J.Value)



  getBlockHeaderByHeight (Xec jsonRpc) blockHeight = do

    blockHash <- jsonRpcRequest jsonRpc "getblockhash" ([J.Number $ fromIntegral blockHeight] :: V.Vector J.Value)

    getBlockHeader . unwrapXecBlockHeader <$> jsonRpcRequest jsonRpc "getblock" ([blockHash] :: V.Vector J.Value)



  getBlockByHeight (Xec jsonRpc) blockHeight = do

    blockHash <- jsonRpcRequest jsonRpc "getblockhash" ([J.Number $ fromIntegral blockHeight] :: V.Vector J.Value)

    -- try get everything in one RPC call

    eitherBlock <- try $ unwrapXecBlock <$> jsonRpcRequest jsonRpc "getblock" ([blockHash, J.Number 2] :: V.Vector J.Value)

    case eitherBlock of

      Right block -> return block

      Left SomeException {} -> do

        -- request block with transactions' hashes

        blockJson <- jsonRpcRequest jsonRpc "getblock" ([blockHash, J.Bool True] :: V.Vector J.Value)

        transactionsHashes <- either fail return $ J.parseEither (J..: "tx") blockJson

        transactions <- forM transactionsHashes $ \case

          -- some Xec clones return full transaction here anyhow, because fuck you

          -- well, less work needed in that case

          transaction@(J.Object {}) -> return transaction

          transactionHash@(J.String {}) -> jsonRpcRequest jsonRpc "getrawtransaction" ([transactionHash, J.Number 1] :: V.Vector J.Value)

          _ -> fail "wrong tx hash"

        fmap unwrapXecBlock $ either fail return $ J.parseEither J.parseJSON $ J.Object $ HM.insert "tx" (J.Array transactions) blockJson



getVersionString :: Int -> T.Text

getVersionString n = T.pack $ showsPrec 0 v4 $ '.' : (showsPrec 0 v3 $ '.' : (showsPrec 0 v2 $ '.' : show v1)) where

  (p1, v1) = n `quotRem` 100

  (p2, v2) = p1 `quotRem` 100

  (p3, v3) = p2 `quotRem` 100

  v4 = p3 `rem` 100

