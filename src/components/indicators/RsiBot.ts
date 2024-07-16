import { RSI } from "technicalindicators";

function RsiBot(coinData) {
    const RSI_Result = RSI.calculate({
        values: coinData.map(x => x[4]),
        period: 14
    });
    const lastState = []
    for (let i = 1; i < RSI_Result.length; i++) {
        if (RSI_Result[i] < 30 && RSI_Result[i - 1] >= 30) {
            lastState.push({ index: i, rsi: RSI_Result[i], value: coinData[i][4], state: "buy" });
        } else if (RSI_Result[i] > 70 && RSI_Result[i - 1] <= 70) {
            lastState.push({ index: i, rsi: RSI_Result[i], value: coinData[i][4], state: "sell" });
        } else {
            lastState.push({ index: i, rsi: RSI_Result[i], value: coinData[i][4], state: "natural" });
        }
    }
    return lastState;
}

export default RsiBot