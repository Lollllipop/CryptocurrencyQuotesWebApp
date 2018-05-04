import axios from 'axios';

export const INIT_VIEW = 'INIT_VIEW';
export const INIT_DETAIL_VIEW = 'INIT_DETAIL_VIEW';  
export const INIT_DETAIL_VIEW_COIN_LIST = 'INIT_DETAIL_VIEW_COIN_LIST';  
export const INIT_DETAIL_MIDDLE_ACTION = 'INIT_DETAIL_MIDDLE_ACTION';

const CRYPTO_CURRENCY_LIST_URL = 'https://min-api.cryptocompare.com/data/all/coinlist';
const CRYPTO_CURRENCY_QUOTES_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
const CRYPTO_CURRENCY_PRICE_HISTORICAL_URL = 'https://min-api.cryptocompare.com/data/histohour';
const CRYPTO_CURRENCY_PRICE_HISTORICAL_MINUTE_URL = 'https://min-api.cryptocompare.com/data/histominute';
const TO_SYMBOL = 'KRW';
const HISTORICAL_LIMIT = '71';
const HISTORICAL_MINUTE_LIMIT = '1439';

let coinsNameList = [];
let coinsSymbolList = [];
let coinsImageUrlList = [];
let coinsIdList = [];

export function initViewAsync() {
  return dispatch => {

    axios.get(CRYPTO_CURRENCY_LIST_URL)
      .then(response => {
        const coinsList = Object.keys(response.data.Data).map(key => response.data.Data[key]); // [{...},{...}...]
        coinsList.sort((a, b) => a.SortOrder - b.SortOrder); // sort (asc)
        coinsNameList = coinsList.map(obj => obj.CoinName); // ['Bitcoin','Ethereum'...]
        coinsSymbolList = coinsList.map(obj => obj.Symbol); // ['BTC','ETH'...]
        coinsImageUrlList = coinsList.map(obj => obj.ImageUrl); // ['/media/19782/btc.png', '/media/27010595/eth_logo.png'...]
        coinsIdList = coinsList.map(obj => obj.Id); // ['1182', '7605'...]
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
          result.imageUrl = coinsImageUrlList[i];
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
            coinsImageUrlList: coinsImageUrlList,
            coinsIdList: coinsIdList,
            coinsPriceHistoricalObject: coinsPriceHistoricalObject,
            pageCount: pageCount,
            onLoad: false
          }});
      });
  };
}

export function initDetailViewAsync(coinName) { // coinName 값만 가지고 있고 symbol, id 값을 구해야 함
  return (dispatch, getState) => {

    dispatch({
      type: INIT_DETAIL_MIDDLE_ACTION, 
      data: {
        onLoad: true
      }
    });

    const currentState = getState();
    let coinsObjectList;

    if (currentState.mainReducer.coinsSymbolList.length === 0) { // 초기화가 안되어 있다면
      axios.get(CRYPTO_CURRENCY_LIST_URL)
        .then(response => {
          const coinsList = Object.keys(response.data.Data).map(key => response.data.Data[key]);
          const coinImageUrl = coinsList.filter(object => object.CoinName === coinName)[0].ImageUrl;
          coinsList.sort((a, b) => a.SortOrder - b.SortOrder);
          coinsNameList = coinsList.map(obj => obj.CoinName); // ['Bitcoin','Ethereum'...]
          dispatch({
            type: INIT_DETAIL_VIEW_COIN_LIST, 
            data: {
              coinsNameList: coinsNameList
            }
          });
          coinsObjectList = coinsListToObject(coinsList); // {Bitcoin: ['BTC', '1180'], Ethereum: ['ETH', '1490'] ...}
          const coinPricePromise = axios.get(`${CRYPTO_CURRENCY_QUOTES_URL}?fsyms=${coinsObjectList[coinName][0]}&tsyms=${TO_SYMBOL}`);
          const coinHistoricalPricePromise = axios.get(`${CRYPTO_CURRENCY_PRICE_HISTORICAL_MINUTE_URL}?fsym=${coinsObjectList[coinName][0]}&tsym=${TO_SYMBOL}&limit=${HISTORICAL_MINUTE_LIMIT}`);
          const promises = [coinPricePromise, coinHistoricalPricePromise];

          Promise.all(promises)
            .then(response => { // response = [{...}, {...}] 하나의 코인에 대한 가격과 이전가격정보 담김
              const coinDisplayObject = {
                data: response[0].data.DISPLAY,
                name: coinName,
                symbol: coinsObjectList[coinName][0],
                img: `https://www.cryptocompare.com${coinImageUrl}`
              };
              const lastMinute = response[1].data.Data[parseInt(HISTORICAL_MINUTE_LIMIT, 10)].time;
              const coinHistoricalClosePriceList = response[1].data.Data.map(priceObject => priceObject.close);
              coinHistoricalClosePriceList.forEach((item, index, array) => array[index] = parseInt(item, 10));

              dispatch({
                type: INIT_DETAIL_VIEW, 
                data: {
                  coinDisplayObject: coinDisplayObject,
                  coinHistoricalClosePriceList: coinHistoricalClosePriceList,
                  lastMinute: lastMinute,
                  onLoad: false
                }
              });
            });
        });

    } else { // 초기화가 되어 있다면
      let objectTmp = {};
      for (let i in currentState.mainReducer.coinsIdList) {
        objectTmp[currentState.mainReducer.coinsNameList[i]] = [currentState.mainReducer.coinsSymbolList[i], currentState.mainReducer.coinsIdList[i]];
      }
      coinsObjectList = objectTmp;

      const coinPricePromise = axios.get(`${CRYPTO_CURRENCY_QUOTES_URL}?fsyms=${coinsObjectList[coinName][0]}&tsyms=${TO_SYMBOL}`);
      const coinHistoricalPricePromise = axios.get(`${CRYPTO_CURRENCY_PRICE_HISTORICAL_MINUTE_URL}?fsym=${coinsObjectList[coinName][0]}&tsym=${TO_SYMBOL}&limit=${HISTORICAL_MINUTE_LIMIT}`);
      const promises = [coinPricePromise, coinHistoricalPricePromise];

      Promise.all(promises)
        .then(response => {
          const coinDisplayObject = {
            data: response[0].data.DISPLAY,
            name: coinName,
            symbol: coinsObjectList[coinName][0],
            img: `https://www.cryptocompare.com${coinsImageUrlList[coinsNameList.indexOf(coinName)]}`
          };
          const lastMinute = response[1].data.Data[parseInt(HISTORICAL_MINUTE_LIMIT, 10)].time;
          const coinHistoricalClosePriceList = response[1].data.Data.map(priceObject => priceObject.close);
          coinHistoricalClosePriceList.forEach((item, index, array) => array[index] = parseInt(item, 10));
          
          dispatch({
            type: INIT_DETAIL_VIEW, 
            data: {
              coinDisplayObject: coinDisplayObject,
              coinHistoricalClosePriceList: coinHistoricalClosePriceList,
              lastMinute: lastMinute,
              onLoad: false
            }
          });
        });
    }
  };
}


function coinsListToObject(array) {
  let object = {};
  for (let val of array) {
    object[val.CoinName] = [val.Symbol, val.Id];
  }
  return object;
}
