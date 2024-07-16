import HomeContext from '../../../context/HomeContext'
import { stateColor } from '../../../utils/helper'

function ChartDetail() {
    const homeContext = HomeContext()
  return (
    <div className="chart">
      {(homeContext.chart || []).map(coin => {
        return <div className="coinState">
          <h3>{coin.symbol.replace("/USDT", "")}</h3>
          <div className="analys">
            <span style={{ color: stateColor(coin.currentPoint.rsi) }}>RSI</span>
            <span style={{ color: stateColor(coin.currentPoint.macd) }}>MACD</span>
          </div>
        </div>
      })}
    </div>
  )
}

export default ChartDetail