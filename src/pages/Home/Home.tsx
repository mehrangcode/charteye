import ccxt from "ccxt"
import { useEffect, useRef, useState } from "react"
import { coinsListSymbol } from "../../assets/coinsListSymbol"
import HomeContext from "../../context/HomeContext"
import ChartDetail from "./componsnts/ChartDetail"
import SummaryChart from "./componsnts/SummaryChart"
import './home.css'
function Home() {
  const [pointer, setPointer] = useState(0)
  const [ex, setEx] = useState(undefined)
  const [viewMode, setViewMode] = useState("summary")
  const homeContext = HomeContext()

  // console.log("DATA: ", chart)
  const agent = useRef(null)
  useEffect(() => {
    homeContext.setChart([])
    setEx(new ccxt.binance())
    clearInterval(agent.current)
    agent.current = setInterval(() => {
      setCounter()
    }, 1500)
    // setTimeout(() => {
    //   fetchData(null, coinsListSymbol, 0)
    // }, 1000);
  }, [])
  useEffect(() => {
    fetchData(ex, coinsListSymbol[pointer], "1h")
  }, [pointer, ex])
  async function setCounter() {
    setPointer(current => {
      if (current < coinsListSymbol.length - 1) {
        return current + 1
      } else {
        return 0
      }
    })
  }
  async function fetchData(exchange, coin, timeFrame) {
    try {
      if (!exchange) {
        exchange = await new ccxt.binance()
      }
      if (exchange) {
        await homeContext.fetchCoinData(exchange, coin + "/USDT", timeFrame)
      }
    } catch (error) {
    }
  }

  // function analysCoin(coin: CoinType, indicatorName) {
  //   const buy = coin[indicatorName].slice(-5).filter(x => x.state === "buy").length
  //   const sell = coin[indicatorName].slice(-5).filter(x => x.state === "sell").length
  //   const natural = coin[indicatorName].slice(-5).filter(x => x.state === "natural").length
  //   if (buy > 0 && sell === 0) return "buy"
  //   if (sell > 0 && buy === 0) return "sell"
  //   if (buy > sell && buy > natural) return "stronglyBuy"
  //   if (sell > buy && sell > natural) return "stronglySell"
  //   return "natural"
  // }

  return (
    <div className="homePage">
      <div className="homePageNavbar">
        <div className="viewMode" onClick={() => {
          setViewMode(viewMode === "summary" ? "detail" : "summary")
        }}>{viewMode}</div>
        <div className="currentTarget">current: {coinsListSymbol[pointer]}</div>
      </div>
      {viewMode === "detail" ? <ChartDetail /> : <SummaryChart />}
    </div>
  )
}

export default Home