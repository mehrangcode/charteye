import create from 'zustand';
import { getHistory } from '../apis/coinHistoryApi';
import { currentPoint } from '../components/indicators/analysor';
export interface CoinType {
    symbol: string
    currentPoint: { rsi: number, macd: number, total: number }
    price: number
}
type IState = {
    loading: boolean
    currentTarget: string
    chart: CoinType[]
    setChart: (data: CoinType[]) => void
    fetchCoinData: (exchange, coinSymbol, timeFrame) => void
}
const HomeContext = create<IState>((set, get) => ({
    loading: false,
    currentTarget: "",
    chart: [],
    setChart: (data) => {
        set({ chart: data })
    },
    fetchCoinData: async (exchange, coinSymbol, timeFrame) => {
        try {
            set({currentTarget: coinSymbol})
            const res = await getHistory(exchange, coinSymbol, timeFrame)
            const payload = {
                symbol: coinSymbol,
                price: res.slice(-1)[2],
                currentPoint: null
            }
            payload.currentPoint = currentPoint(res)
            payload.currentPoint.total = payload.currentPoint.rsi + payload.currentPoint.macd
            console.log(coinSymbol, " : ", payload)
            // set({chart: [payload]})
            // if (payload.currentPoint.total !== 0) {
            //     const chartData = get().chart
            //     let updateData = []
            //     if (!chartData.some(x => x.symbol === payload.symbol)) {
            //         updateData = [...chartData, payload]
            //     } else {
            //         updateData = chartData.map(x => {
            //             if (x.symbol === payload.symbol) {
            //                 return payload
            //             }
            //             return x
            //         })
            //     }
            //     set({ chart: updateData })
            // }
        } catch (error) {
            throw new Error(error)
        }
    }
}));

export default HomeContext;