import axios from 'axios';
// import io from 'socket.io-client';

export const INIT_VIEW = 'INIT_VIEW';    

const COIN_TOP20_RANK_API_URL = 'https://api.coinmarketcap.com/v1/ticker/?convert=KRW&limit=20';
const CRYPTO_CURRENCY_QUOTES_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
const TO_SYMBOL = 'KRW';
let coinsNameList = [];

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
        const coinsTop20NameList = response.data.map(v => ({name:v.name, symbol:v.symbol}));
        coinsNameList = coinsTop20NameList.map(object => object.name); // 이것도 어떻게 쿨하게 수정 안될까..?
        const coinsTop10NameList = coinsTop20NameList.map(object => { // 굉장히 안좋은 코드 수정필요
          if (object.symbol=='MIOTA')
            return 'IOT';
          return object.symbol;
        }).slice(0,10).join();
        return axios.get(`${CRYPTO_CURRENCY_QUOTES_URL}?fsyms=${coinsTop10NameList}&tsyms=${TO_SYMBOL}`); 
      })
      .then(response => {
        response = Object.keys(response.data.DISPLAY).map((key,i) => {
          const result = response.data.DISPLAY[key];
          result.name = coinsNameList[i];
          result.symbol = key;
          return result;
        });
        dispatch({type: INIT_VIEW, data: response});
      });
  };
}
