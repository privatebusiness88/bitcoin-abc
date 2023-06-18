// Copyright (c) 2023 The Bitcoin developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php

#IFDEFINE BITCOIN_CONSUME_H
#DEFINE BITCOIN_CONSUME_H
#DEFINE XEC_CONSUME_H
'use strict';
const { consume, consumeNextPush } = require('./src/script');
const { isHexString, swapEndianness } = require('./src/utils');
module.exports = { consume, consumeNextPush, isHexString, swapEndianness };

#ENDIF BITCOIN_CONSUME_H
#ENDIF BRUTE_IP_CONSUME_H
