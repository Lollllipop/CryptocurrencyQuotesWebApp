import axios from 'axios';

export const CLICK_BUTTON = 'CLICK_BUTTON';  
export const CLICK_BUTTON_MIDDLE_ACTION = 'CLICK_BUTTON_MIDDLE_ACTION';

const CRYPTO_CURRENCY_QUOTES_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
const CRYPTO_CURRENCY_PRICE_HISTORICAL_URL = 'https://min-api.cryptocompare.com/data/histohour';

const TO_SYMBOL = 'KRW';
const HISTORICAL_LIMIT = '71';

export function clickButtonAsync(buttonType) {
  const addOne = (buttonType === 'prev') ? -1 : 1; // 이 한 줄로 next, prev 구분

  return (dispatch, getState) => {
    dispatch({
      type: CLICK_BUTTON_MIDDLE_ACTION, 
      data: {
        onLoad: true // load만 전달
      }
    }); 

    const currentState = getState();
    const currentPageCount = currentState.mainReducer.pageCount + addOne;
    const currentCoinsSymbolList = currentState.mainReducer.coinsSymbolList;
    const currentCoinsNameList = currentState.mainReducer.coinsNameList;
    const currentCoinsImageUrl = currentState.mainReducer.coinsImageUrlList;
    const nextCoins10SymbolString = currentCoinsSymbolList.slice(currentPageCount * 10, (currentPageCount + 1) * 10).join();
    const nextCoins10NameList = currentCoinsNameList.slice(currentPageCount * 10, (currentPageCount + 1) * 10);
    const nextCoins10ImageUrlList = currentCoinsImageUrl.slice(currentPageCount * 10, (currentPageCount + 1) * 10);
    const coins10SymbolList = nextCoins10SymbolString.split(',');
    const priceHistoricalPromises = coins10SymbolList.map(symbol => axios.get(`${CRYPTO_CURRENCY_PRICE_HISTORICAL_URL}?fsym=${symbol}&tsym=${TO_SYMBOL}&limit=${HISTORICAL_LIMIT}`));
    const priceCoins10Promise = axios.get(`${CRYPTO_CURRENCY_QUOTES_URL}?fsyms=${nextCoins10SymbolString}&tsyms=${TO_SYMBOL}`);
    priceHistoricalPromises.push(priceCoins10Promise);

    Promise.all(priceHistoricalPromises)
      .then(response => {
        if(response.length === 11){
          const coins10DisplayList = Object.keys(response[10].data.DISPLAY).map((key, i) => {
            const result = response[10].data.DISPLAY[key];
            result.name = nextCoins10NameList[i];
            result.symbol = key;
            result.imageUrl = nextCoins10ImageUrlList[i];
            return result;
          });
          const coinsPriceHistoricalObject = {};
          for (var i in response.slice(0, 10)) {
            const coinpriceHistoricalList = response[i].data.Data;
            coinsPriceHistoricalObject[coins10SymbolList[i]] = coinpriceHistoricalList.map(object => object.high);
          }
          dispatch({
            type: CLICK_BUTTON, 
            data: {
              coins10DisplayList: coins10DisplayList,
              coinsPriceHistoricalObject: coinsPriceHistoricalObject,
              pageCount: currentPageCount,
              onLoad: false
            }
          });         
        }
      });
  };
}
