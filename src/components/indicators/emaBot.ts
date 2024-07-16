import { EMA } from 'technicalindicators';

const emaBot = (coinData) => {

    const calculateEMA = (period, values) => {
        return EMA.calculate({ period, values });
    };

    const generateSignals = (shortEMA, longEMA) => {
        let signals = [];
        for (let i = 1; i < shortEMA.length; i++) {
            if (shortEMA[i] > longEMA[i]) {
                signals.push({ state: 'buy' });
            } else if (shortEMA[i] < longEMA[i]) {
                signals.push({ state: 'sell' });
            }
        }
        return signals;
    };

    const shortPeriod = 5; // 5-minute EMA
    const longPeriod = 20; // Hourly EMA
    const shortEMA = calculateEMA(shortPeriod, coinData);
    const longEMA = calculateEMA(longPeriod, coinData);
    const combinedSignals = generateSignals(shortEMA, longEMA);
    console.log(combinedSignals)
    return combinedSignals
};

export default emaBot;
