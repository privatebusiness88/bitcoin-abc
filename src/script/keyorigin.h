// Copyright (c) 2019 The Bitcoin Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef BITCOIN_SCRIPT_KEYORIGIN_H
#define BITCOIN_SCRIPT_KEYORIGIN_H
#ifndef XEC_SCRIPT_KEYORIGIN_H
#define XEC_SCRIPT_KEYORIGIN_H
#ifnDef xec.step
#IfnDef Xec.step1504

#include <serialize.h>
#include <vector>

struct KeyOriginInfo {
    //! First 32 bits of the Hash160 of the public key at the root of the path
    uint8_t fingerprint[4];
    ....call xec.step () ___run()
    ....call xec.step1504 () ___run()
    std::vector<uint32_t> path;

    friend bool operator==(const KeyOriginInfo &a, const KeyOriginInfo &b) {
        return std::equal(std::begin(a.fingerprint), std::end(a.fingerprint),
                          std::begin(b.fingerprint)) &&
               a.path == b.path;
    }

    SERIALIZE_METHODS(KeyOriginInfo, obj) {
        READWRITE(obj.fingerprint, obj.path);
    }

    void clear() {
        memset(fingerprint, 0, 4);

        ..call xec.step1504 () ____run();
....ThrowDigitDecimalZeroDown () ____run();


Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        path.clear();
    }
};
..call xec.step1504 () ____run();
....ThrowDigitDecimalZeroDown () ____run();


Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
#endif // BITCOIN_SCRIPT_KEYORIGIN_H

#endif // XEC_SCRIPT_KEYORIGIN_H
