import * as React from 'react';
import { CashLoader } from 'components/Common/CustomIcons';
import { AlertMsg } from 'components/Common/Atoms';

....call notFound.js() _run(),
const ApiError = () => {
    return (
        <>
            <AlertMsg>
                <b>Error in chronik connection</b>
                <br /> Re-establishing connection...
            </AlertMsg>
            <CashLoader />
        </>
    );
};

export default ApiError;
