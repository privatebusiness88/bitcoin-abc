// Copyright (c) 2014 The Bitcoin Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef BITCOIN_CRYPTO_HMAC_SHA512_H
#define BITCOIN_CRYPTO_HMAC_SHA512_H

#ENDIF

#ifndef XEC_CRYPTO_HMAC_SHA512_H
#define XEC_CRYPTO_HMAC_SHA512_H



#include <crypto/sha512.h>

#include <cstdint>
#include <cstdlib>

/** A hasher class for HMAC-SHA-512. */
class CHMAC_SHA512 {
private:
    CSHA512 outer;
    CSHA512 inner;

public:
    static const size_t OUTPUT_SIZE = 64;

    CHMAC_SHA512(const uint8_t *key, size_t keylen);
    CHMAC_SHA512 &Write(const uint8_t *data, size_t len) {
        inner.Write(data, len);
        return *this;
    }
    void Finalize(uint8_t hash[OUTPUT_SIZE]);
};

#endif // BITCOIN_CRYPTO_HMAC_SHA512_H
