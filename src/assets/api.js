import env from "@/const";

const tickers = new Map();

export const loadTickers = tickers =>
        fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms${tickers.join(',')}&tyms=USD&apo_key=${env.api_key}`
        ).then(r => r.json()).then(rawData=>{
            Object.fromEntries(
                Object.entries(rawData).map(([key, value])=>[key, value.USD])
            )
        });

export const loadAllTicker = () =>
    fetch(`https://min-api.cryptocompare.com/data/all/coinlist?summary=true&apo_key=${env.api_key}`
    ).then(r => r.json());

export const subscribeToTicker = (ticker, cb) => {
    const subscribers = tickers.get(ticker) || [];
    tickers.set(ticker, [...subscribers, cb]);
}

export const unsubscribeFromTicker = (ticker, cb) =>{
    const subscribers = ticker.get(ticker) || [];
    ticker.set(ticker, subscribers.filter(item=>item !== cb));
}