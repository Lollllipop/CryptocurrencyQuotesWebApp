import axios from 'axios';

export const INIT_VIEW = 'INIT_VIEW';    

const CRYPTO_CURRENCY_LIST_URL = 'https://min-api.cryptocompare.com/data/all/coinlist';
const CRYPTO_CURRENCY_QUOTES_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
const CRYPTO_CURRENCY_PRICE_HISTORICAL_URL = 'https://min-api.cryptocompare.com/data/histohour';
const TO_SYMBOL = 'KRW';
const HISTORICAL_LIMIT = '71';

let coinsNameList = [];
let coinsSymbolList = [];

export function initViewAsync() {
  return dispatch => {
    axios.get(CRYPTO_CURRENCY_LIST_URL)
      .then(response => {
        const coinsList = Object.keys(response.data.Data).map(key => response.data.Data[key]); // [{...},{...}...]
        coinsList.sort((a, b) => a.SortOrder - b.SortOrder); // sort (asc)
        coinsNameList = coinsList.map(obj => obj.CoinName); // ['Bitcoin','Ethereum'...]
        coinsSymbolList = coinsList.map(obj => obj.Symbol); // ['BTC','ETH'...]
        const coins10SymbolString = coinsList.map(object => object.Symbol).slice(0, 10).join();
        const coins10SymbolList = coins10SymbolString.split(',');
        const priceHistoricalPromises = coins10SymbolList.map(symbol => axios.get(`${CRYPTO_CURRENCY_PRICE_HISTORICAL_URL}?fsym=${symbol}&tsym=${TO_SYMBOL}&limit=${HISTORICAL_LIMIT}`));
        const priceCoins10Promise = axios.get(`${CRYPTO_CURRENCY_QUOTES_URL}?fsyms=${coins10SymbolString}&tsyms=${TO_SYMBOL}`);
        priceHistoricalPromises.push(priceCoins10Promise); 
        return Promise.all(priceHistoricalPromises);
      })
      .then(response => {
        const pageCount = 0;
        const coins10DisplayList = Object.keys(response[10].data.DISPLAY).map((key, i) => {
          const result = response[10].data.DISPLAY[key];
          result.name = coinsNameList[i];
          result.symbol = key;
          return result;
        });
        const coinsPriceHistoricalObject = {};
        for (var i in response.slice(0, 10)) {
          const coinpriceHistoricalList = response[i].data.Data;
          coinsPriceHistoricalObject[coinsSymbolList[i]] = coinpriceHistoricalList.map(object => object.high);
        }
        dispatch({
          type: INIT_VIEW, 
          data: {
            coins10DisplayList: coins10DisplayList,
            coinsNameList: coinsNameList,
            coinsSymbolList: coinsSymbolList,
            coinsPriceHistoricalObject: coinsPriceHistoricalObject,
            pageCount: pageCount,
            onLoad: false
          }});
      });
  };
}
