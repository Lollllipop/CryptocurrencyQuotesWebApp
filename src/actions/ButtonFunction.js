import axios from 'axios';

export const CLICK_BUTTON = 'CLICK_BUTTON';    

const CRYPTO_CURRENCY_QUOTES_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
const TO_SYMBOL = 'KRW';

export function ClickButtonAsync(buttonType){

  const addOne = (buttonType === 'prev') ? -1 : 1; // 이 한 줄로 next, prev 구분

  return (dispatch, getState) => {
    const currentState = getState();
    const currentPageCount = currentState.mainReducer.pageCount + addOne;
    const currentCoinsSymbolList = currentState.mainReducer.coinsSymbolList;
    const currentCoinsNameList = currentState.mainReducer.coinsNameList;
    const nextCoins10SymbolString = currentCoinsSymbolList.slice(currentPageCount*10, (currentPageCount+1)*10).join();
    const nextCoins10NameList = currentCoinsNameList.slice(currentPageCount*10, (currentPageCount+1)*10);

    axios.get(`${CRYPTO_CURRENCY_QUOTES_URL}?fsyms=${nextCoins10SymbolString}&tsyms=${TO_SYMBOL}`)
      .then(response => {
        if(response.data.DISPLAY){
          const coins10DisplayList = Object.keys(response.data.DISPLAY).map((key,i) => {
            const result = response.data.DISPLAY[key];
            result.name = nextCoins10NameList[i];
            result.symbol = key;
            return result;
          });
          dispatch({
            type: CLICK_BUTTON, 
            data: {
              coins10DisplayList: coins10DisplayList,
              pageCount: currentPageCount
            }
          });         
        }
      });
  };

}
