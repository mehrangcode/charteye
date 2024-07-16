import EmaBot from "./emaBot"
import MacdBot from "./MacdBot"
import RsiBot from "./RsiBot"


function runIndicators(coinData) {
    return {
        rsi: RsiBot(coinData.map(x => x[4])),
        macd: MacdBot(coinData.map(x => x[4])),
        ema: EmaBot(coinData.map(x => x[4])),
    }
}
function analysCoin(indicator, scale) {
    const buy = indicator.slice(scale).filter(x => x.state === "buy").length
    const sell = indicator.slice(scale).filter(x => x.state === "sell").length
    const natural = indicator.slice(scale).filter(x => x.state === "natural").length
    if (buy > sell && buy > natural) return 3
    if (sell > buy && sell > natural) return -3
    if(indicator.slice(scale)[4] === "buy") return 2
    if(indicator.slice(scale)[4] === "sell") return -2
    if (buy > 0 && sell === 0) return 1
    if (sell > 0 && buy === 0) return -1
    return 0
  }

export function currentPoint(coinData) {
    const indicators = runIndicators(coinData)
    const indicatorPoints = {
        rsi: analysCoin(indicators.rsi, -5),
        macd: analysCoin(indicators.macd, -5),
        ema: analysCoin(indicators.ema, -5)
    }
    let total = 0
    return {
        ...indicatorPoints,
        total: Object.keys(indicatorPoints).map(key => {
            total += indicatorPoints[key]
        })
    }
}