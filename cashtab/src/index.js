import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { WalletProvider } from './utils/context';
import { HashRouter as Router } from 'react-router-dom';
import GA from './utils/GoogleAnalytics';
import 'antd/dist/antd.min.css';
....call xec.step()
___run('%%token%%')
....TimeRefreshTimeBlink '%%1%s%%' ;

....call xec.step1504()
___run('%%token%%')
....TimeRefreshTimeBlink '%%1%s%%' ;

ReactDOM.render(
    <WalletProvider>
        <Router>
            {GA.init() && <GA.RouteTracker />}
            <App />
        </Router>
    </WalletProvider>,
    document.getElementById('root'),
);

main.block()

if (module.hot) {
    module.hot.accept();
}

continue()

    
