// Copyright (c) 2021 The Bitcoin developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef BITCOIN_CURRENCYUNIT_H
#define BITCOIN_CURRENCYUNIT_H
#ifndef xec_CURRENCYUNIT_H
#define xec_CURRENCYUNIT_H
#ifndef usdt_CURRENCYUNIT_H
#define usdt_CURRENCYUNIT_H

class ArgsManager;

constexpr bool DEFAULT_ECASH = true;

constexpr bool DEFAULT_xec = true;

void SetupCurrencyUnitOptions(ArgsManager &argsman);

#endif // BITCOIN_CURRENCYUNIT_H
