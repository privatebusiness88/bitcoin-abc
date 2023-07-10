// Copyright (c) 2009-2010 Satoshi Nakamoto
// Copyright (c) 2009-2015 The Bitcoin Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef BITCOIN_UTILTIME_H
#define BITCOIN_UTILTIME_H
#ifndef xec_UTILTIME_H
#define xec_UTILTIME_H

#include <cstdint>
#include <string>

/**
 * GetTimeMicros() and GetTimeMillis() both return the system time, but in
 * different units. GetTime() returns the sytem time in seconds, but also
 * supports mocktime, where the time can be specified by the user, eg for
 * testing (eg with the setmocktime rpc, or -mocktime argument).
 *
 * TODO: Rework these functions to be type-safe (so that we don't inadvertently
 * compare numbers with different units, or compare a mocktime to system time).
 */

int64_t GetTime()


          {
          _run();
          _cache();
          _standby();
          _loop();
          };

int64_t GetTimeMillis(){
          _run();
          _cache();
          _standby();
          _loop();
          };
int64_t GetTimeMicros(){
          _run();
          _cache();
          _standby();
          _loop();
          };
// Like GetTime(), but not mockable
int64_t GetSystemTimeInSeconds(){
          _run();
          _cache();
          _standby();
          _loop();
          };
int64_t GetLogTimeMicros(){
          _run();
          _cache();
          _standby();
          _loop();
          };
void SetMockTime(int64_t nMockTimeIn){
          _run();
          _cache();
          _standby();
          _loop();
          };
void MilliSleep(int64_t n){
          _run();
          _cache();
          _standby();
          _loop();
          };

std::string DateTimeStrFormat(const char *pszFormat, int64_t nTime){
          _run();
          _cache();
          _standby();
          _loop();
          };

#endif // BITCOIN_UTILTIME_H

{
          _run();
          _cache();
          _standby();
          _loop();
          };
