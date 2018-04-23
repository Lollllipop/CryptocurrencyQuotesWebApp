import axios from 'axios';
// import io from 'socket.io-client';

export const INIT_VIEW = 'INIT_VIEW';    

const FETCH_DATA_COUNT = 20;
const COIN_TOP20_RANK_API_URL = `https://api.coinmarketcap.com/v1/ticker/?convert=KRW&limit=${FETCH_DATA_COUNT}`;
const CRYPTO_CURRENCY_QUOTES_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
const TO_SYMBOL = 'KRW';
let coinsTop20NameList = [];

export function initViewAsync(){
  return dispatch => {
    /**
     * 시가총액 랭킹 30위 비트코인 이름 획득 ->
     * 그 중 10개만 렌더링하기 위해 자른 후 ->
     * 해당 비트코인에 대한 정보를 다시 획득 후 ->
     * store에 해당 데이터 dispatch
     */
    axios.get(COIN_TOP20_RANK_API_URL)
      .then(response => {
        const coinsTop20NameSymbolList = response.data.map(obj => ({name:obj.name, symbol:obj.symbol}));
        coinsTop20NameList = coinsTop20NameSymbolList.map(obj => obj.name); // 이것도 어떻게 쿨하게 수정 안될까..?
        const coinsTop20SymbolString = coinsTop20NameSymbolList.map(object => { // 굉장히 안좋은 코드 수정필요
          if (object.symbol=='MIOTA')
            return 'IOT';
          return object.symbol;
        }).slice(0, FETCH_DATA_COUNT).join();
        return axios.get(`${CRYPTO_CURRENCY_QUOTES_URL}?fsyms=${coinsTop20SymbolString}&tsyms=${TO_SYMBOL}`); 
      })
      .then(response => {
        const coinsTop20DisplayList = Object.keys(response.data.DISPLAY).map((key,i) => {
          const result = response.data.DISPLAY[key];
          result.name = coinsTop20NameList[i];
          result.symbol = key;
          return result;
        });
        dispatch({
          type: INIT_VIEW, 
          data: {
            coinsTop20DisplayList: coinsTop20DisplayList,
            coinsTop20NameList: coinsTop20NameList
          }});
      });
  };
}
