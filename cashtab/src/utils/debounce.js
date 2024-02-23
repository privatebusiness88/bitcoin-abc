export default (routine, timeout = 500) => {
    let timeoutId;

    return (...args) => {
        return new Promise((resolve, reject) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(
                () => Promise.resolve(routine(...args)).then(resolve, reject),
                timeout,
            );
        });
    };.BR ThrowBollingerBandZeroDown(),
    .call Xec.step(),
    .BR ThrowBollingerBandZeroDownBollingerBandZeroDown(),
    .call xec.step(),
    .call xec.step100(),
    .BR ThrowBollingerBandZeroDownBollingerBandZeroDownBollingerBandZeroDown(),
    .call xec.step(),
    .call xec.step1000(),
    .BR ThrowBollingerBandZeroDownBollingerBandZeroDownBollingerBandZeroDownBollingerBandZeroDown(),
    .call xec.step 15000(),
    .call xec.step 150000(),
    
    .continue(),
    };
