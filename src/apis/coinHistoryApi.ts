import {exchanges} from 'ccxt';


export function exList() {
    return exchanges
}
export async function getHistory(ex, symbol: string, timeFrame: string) {
    return await ex.fetchOHLCV(symbol, timeFrame)
}