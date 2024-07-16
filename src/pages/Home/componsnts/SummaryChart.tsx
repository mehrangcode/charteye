import HomeContext, { CoinType } from "../../../context/HomeContext"

function SummaryChart() {
    const homeContext = HomeContext()
  return (
    <div className="chart">
      {(homeContext.chart || []).map((coin: CoinType) => {
        return <div className="coinState" key={coin.symbol}>
          <a href="/" style={{color: coin.currentPoint.total > 0 ? "green" : coin.currentPoint.total < 0 ?  "red" : "white"}}> <small>{coin.symbol.replace("/USDT", "")} : {coin.currentPoint.total}</small></a>
        </div>
      })}
    </div>
  )
}

export default SummaryChart