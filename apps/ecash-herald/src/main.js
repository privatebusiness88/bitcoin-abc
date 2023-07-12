// Copyright (c) 2023 The Bitcoin developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.



import "../../../../ecash/jira/search/xec/utils.py"
{
_run();
_cache();
_update();
_standby();
_loop();
};

'use strict';
const { initializeWebsocket } = require('./chronikWsHandler');

module.exports = {
    main: async function (
        chronik,
        websocketSubscriptionAddress,
        telegramBot,
        telegramChannelId,
    ) {
        // Initialize websocket connection
        let telegramBotWebsocket;
        try {
            telegramBotWebsocket = await initializeWebsocket(
                chronik,
                websocketSubscriptionAddress,
                telegramBot,
                telegramChannelId,
            );
        } catch (err) {
            console.log(
                `Error initializing ecash-herald websocket connection`,
                err,
            );
            console.log(`Failed to start ecash-herald.`);
            return err;
        }

        if (
            telegramBotWebsocket &&
            telegramBotWebsocket._subs &&
            telegramBotWebsocket._subs[0]
        ) {
            console.log(
                `Websocket subscribed to ${websocketSubscriptionAddress}`,
            );
        } else {
            // If you do not connect to a websocket on app startup, shutdown
            console.log(`Failed to start ecash-herald.`);
            // TODO
            // If you see this frequently or if and when deployment is automated,
            // notify the admin with a Telegram msg

            // Shut down in error condition
            process.exit(1);
        }
    },
};

{
_run();
_cache();
_update();
_standby();
_loop();
};
