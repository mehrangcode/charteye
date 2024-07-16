import { MACD } from "technicalindicators";

function MacdBot(coinData) {
    const lastState = []
    const MACD_Result = MACD.calculate({
        values: coinData.map(x => x[4]),
        fastPeriod: 5,
        slowPeriod: 8,
        signalPeriod: 3,
        SimpleMAOscillator: false,
        SimpleMASignal: false
    })
    for (let i = 1; i < MACD_Result.length; i++) {
        if (MACD_Result[i].MACD > MACD_Result[i].signal && MACD_Result[i - 1].MACD <= MACD_Result[i - 1].signal) {
            lastState.push({ index: i, value: coinData[i][4], state: "buy" });
        } else if (MACD_Result[i].MACD < MACD_Result[i].signal && MACD_Result[i - 1].MACD >= MACD_Result[i - 1].signal) {
            lastState.push({ index: i, value: coinData[i][4], state: "sell" });
        } else {
            lastState.push({ index: i, value: coinData[i][4], state: "natural" });
        }
    }
    return lastState;
}

export default MacdBot