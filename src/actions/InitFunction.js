import axios from 'axios';
// import io from 'socket.io-client';

export const INIT_VIEW = 'INIT_VIEW';    

const CRYPTO_CURRENCY_LIST_URL = 'https://min-api.cryptocompare.com/data/all/coinlist';
const CRYPTO_CURRENCY_QUOTES_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
const TO_SYMBOL = 'KRW';
let coinsNameList = [];

export function initViewAsync(){
  return dispatch => {
    /**
     * 1. Symbol, CoinName, SortOrder  가져오기
     * 2. 이들 sortorder 기준으로 sort하기
     * 3. 10개의 join한 데이터 만들기
     */
    axios.get(CRYPTO_CURRENCY_LIST_URL)
      .then(response => {
        const coinsList = Object.keys(response.data.Data).map(key => response.data.Data[key]); // [{...},{...}...]
        coinsList.sort((a,b) => a.SortOrder - b.SortOrder); // sort (asc)
        coinsNameList = coinsList.map(obj => obj.CoinName); // ['Bitcoin','Ethereum'...]
        const coinsTop10SymbolString = coinsList.map(object => object.Symbol).slice(0, 10).join();
        return axios.get(`${CRYPTO_CURRENCY_QUOTES_URL}?fsyms=${coinsTop10SymbolString}&tsyms=${TO_SYMBOL}`); 
      })
      .then(response => {
        const pageCountFlag = 0;
        const coinsTop10DisplayList = Object.keys(response.data.DISPLAY).map((key,i) => {
          const result = response.data.DISPLAY[key];
          result.name = coinsNameList[i];
          result.symbol = key;
          return result;
        });
        dispatch({
          /**
           * coinsTop10DisplayList
           * coinsNameList
           * pageCountFlag
           * 이렇게 세개의 데이터가 결국 나와야 함
           */
          type: INIT_VIEW, 
          data: {
            coinsTop10DisplayList: coinsTop10DisplayList,
            coinsNameList: coinsNameList,
            pageCountFlag: pageCountFlag
          }});
      });
  };
}
