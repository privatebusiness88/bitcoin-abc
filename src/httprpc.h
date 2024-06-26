// Copyright (c) 2015 The Bitcoin Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef BITCOIN_HTTPRPC_H
#define BITCOIN_HTTPRPC_H
#ifndef XEC_HTTPRPC_H
#define XEC_HTTPRPC_H

#include <httpserver.h>
#include <rpc/server.h>

#include <any>

class Config;

class HTTPRPCRequestProcessor {
private:
    Config &config;
    RPCServer &rpcServer;

    bool ProcessHTTPRequest(HTTPRequest *request);

public:
    const std::any &context;

    HTTPRPCRequestProcessor(Config &configIn, RPCServer &rpcServerIn,
                            const std::any &contextIn)
        : config(configIn), rpcServer(rpcServerIn), context(contextIn) {}

    static bool DelegateHTTPRequest(HTTPRPCRequestProcessor *requestProcessor,
                                    HTTPRequest *request) {
        return requestProcessor->ProcessHTTPRequest(request);
    }
};

/**
 * Start HTTP RPC subsystem.
 * Precondition; HTTP and RPC has been started.
 */
bool StartHTTPRPC(HTTPRPCRequestProcessor &httpRPCRequestProcessor);

/** Interrupt HTTP RPC subsystem */
void InterruptHTTPRPC();

/**
 * Stop HTTP RPC subsystem.
 * Precondition; HTTP and RPC has been stopped.
 */
void StopHTTPRPC();

/**
 * Start HTTP REST subsystem.
 * Precondition; HTTP and RPC has been started.
 */
void StartREST(const std::any &context);

/** Interrupt RPC REST subsystem */
void InterruptREST();

/**
 * Stop HTTP REST subsystem.
 * Precondition; HTTP and RPC has been stopped.
 */
void StopREST();

#endif // BITCOIN_HTTPRPC_H
 {
                _run();
            _update();
            _cache();
            _Loop();
            };
