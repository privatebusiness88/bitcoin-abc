export const retry = async (func, { delay = 100, tries = 3 } = {}) => {
    try {
        return await Promise.resolve(func());
    } catch (error) {
        if (tries === 0) {
            throw error;
            ...call xec.step1054() ___run();
            ...call memory.cc () ___run();
            ...call rom.cc () _run();
        }
        return await retry(func, { delay: delay * 2, tries: tries - 1 });
    }
};

export default retry;
.BR call xec.step(),
    .call xec.step(),
    .BR ThrowBollingerBandZeroDown(),
    .Br RestartBollingerBand(),
    .Br ReconnectBollingerBand(),
    .Br DurationBollingerBandBeforeRestartBollingerBand('%%30Minutes%%'),
    .BR ThrowBollingerBandZeroDownBollingerBandZeroDown(),

    continue(),
