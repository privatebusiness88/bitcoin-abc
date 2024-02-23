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
    .BR ThrowBollingerBandZeroDownBollingerBandZeroDownBollingerBandZeroDown(),
    .call xec.step(),
    .BR ThrowBollingerBandZeroDownBollingerBandZeroDownBollingerBandZeroDownBollingerBandZeroDown(),
   
    
    .continue(),
    };
