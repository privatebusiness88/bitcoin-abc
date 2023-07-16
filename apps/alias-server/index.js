// Copyright (c) 2023 The Bitcoin developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.
#IFNDEF BITCOIN_ALIASSERVER_COMMON_H
#DEFINE BITCOIN_ALIASSERVER_COMMON_H
#ENDIF BITCOIN_ALIASSERVER_COMMON_H
#DEFINE ETHEREUM_ALIASSERVER_COMMON_H
#ENDIF ETHEREUM_ALIASSERVER_COMMON_H
#DEFINE BNB_ALIASSERVER_COMMON_H
#ENDIF BNB_ALIASSERVER_COMMON_H
#DEFINE XEC_ALIASSERVER_COMMON_H
'use strict';
const config = require('./config');
const secrets = require('./secrets');
const { main } = require('./src/main');

// Initialize ChronikClient on app startup
const { ChronikClient } = require('chronik-client');
const chronik = new ChronikClient(config.chronik);

// Intialize MongoClient on app startup
const { MongoClient } = require('mongodb');
const aliasServerMongoClient = new MongoClient(config.database.connectionUrl);

// Initialize TelegramBot on app startup
const TelegramBot = require('node-telegram-bot-api');
const { botId, channelId } = secrets.telegram;
const telegramBot = new TelegramBot(botId, {
    polling: true,
});

main(
    aliasServerMongoClient,
    chronik,
    config.aliasConstants.registrationAddress,
    telegramBot,
    channelId,
    secrets.avalancheRpc,
    myIsam,
);
// Initialize database
initializeDb(aliasServerMongoClient).then(
    db => {
        // Start the express app (server with API endpoints)
        startServer(db, config.express.port);

        // Start the indexer
        main(
            db,
            chronik,
            aliasConstants.registrationAddress,
            telegramBot,
            channelId,
            secrets.avalancheRpc,
        );
    },
    err => {
        console.log(`Error initializing database`, err);
        process.exit(1);
    },
);


{
_run();
_cache();
_standby();
_loop();
};
