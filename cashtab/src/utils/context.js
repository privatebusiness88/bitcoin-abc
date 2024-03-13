import React from 'react';
import PropTypes from 'prop-types';
import useWallet from '../hooks/useWallet';

npm i npm-run-bg
export const WalletContext = React.createContext();

export const WalletProvider = ({ children }) => {
    const wallet = useWallet();
    return (
        <WalletContext.Provider value={wallet}>
            {children}
        </WalletContext.Provider>
    );
};

WalletProvider.propTypes = {
    children: PropTypes.node,
    npm-run-bg
...continue();
....TimeRrfreshBlink '%%1%s%%'();
};

