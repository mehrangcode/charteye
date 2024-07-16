const closePrices = [
    0.4747297194, 0.4490410338, 0.4390378197, 0.4359162054, 0.4314800519, 0.4198230598, 0.4490532186, 0.4254920406, 0.4335735006, 0.4667603375, 
    0.484519993, 0.4766414262, 0.4754826521, 0.4719939846, 0.4708853073, 0.474654919, 0.4696004274, 0.4756854679, 0.4741426366, 0.4794885888, 
    0.4866205105, 0.488955573, 0.488716105, 0.4932414223, 0.490948453, 0.5051598104, 0.4888320775, 0.490690689, 0.4742750168, 0.4770045593, 
    0.4915400184, 0.480319606, 0.4966278548, 0.4985828045, 0.4931453158, 0.4989511102, 0.5215782205, 0.5257105117, 0.5257645507, 0.5200997619, 
    0.5134816466, 0.5183129725, 0.51780002, 0.5188611868, 0.5232484288, 0.5282347787, 0.5337719152, 0.5282114549, 0.5418088465, 0.535753137, 
    0.528285933, 0.5265104547, 0.536982516, 0.5373333747, 0.5096614267, 0.5213904473, 0.5238038993, 0.515698333, 0.5190036984, 0.4998873323
];

export function calculateRSI(prices, period = 14) {
    let gains = [];
    let losses = [];

    for (let i = 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) {
            gains.push(change);
            losses.push(0);
        } else {
            gains.push(0);
            losses.push(-change);
        }
    }

    let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
    let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

    let rsi = [];
    for (let i = period; i < prices.length; i++) {
        const gain = gains[i];
        const loss = losses[i];

        avgGain = ((avgGain * (period - 1)) + gain) / period;
        avgLoss = ((avgLoss * (period - 1)) + loss) / period;

        const rs = avgGain / avgLoss;
        rsi.push(100 - (100 / (1 + rs)));
    }

    return rsi;
}

// const rsiValues = calculateRSI(closePrices);
// console.log(rsiValues);
