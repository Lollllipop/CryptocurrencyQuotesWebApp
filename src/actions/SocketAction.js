import axios from 'axios';

export const UPDATE_COINS_WITH_SOCKET = 'UPDATE_COINS_WITH_SOCKET';  

const PRICE_HISTORICAL_URL = 'https://min-api.cryptocompare.com/data/pricehistorical';
const TO_SYMBOL = 'KRW';
const ONE_DAY = 86400;

export function updateCoinsWithSocketAsync(message) {
  return (dispatch, getState) => {

    if (message.split('~').length > 5) {
      messageParser(message)
        .then(response => {
          const currentState = getState();
          const currentCoins10DisplayList = currentState.mainReducer.coins10DisplayList;

          for (let val of currentCoins10DisplayList) {
            if (val.symbol === response.fromSymbol) {
              if (response.price) {
                val.KRW.PRICE = response.price;
              }
              if (response.chagePct24Hour) {
                val.KRW.CHANGEPCT24HOUR = parseFloat(response.chagePct24Hour.toFixed(2));
              }
              if (response.volume24hTo) {
                val.KRW.VOLUME24HOURTO = response.volume24hTo;
              }
              var increaseFlag = response.priceFlag;
            }
          }

          dispatch({
            type: UPDATE_COINS_WITH_SOCKET, 
            data: {
              updatedCoins10DisplayList: currentCoins10DisplayList,
              increaseFlag: [response.fromSymbol, increaseFlag]
            }
          });  
        });
    }
  };
}

async function messageParser(message) {
  const currentEpochTime = Math.round(new Date().getTime()/1000.0);
  let result = {
    fromSymbol: '',
    priceFlag: '',
    price: '',
    chagePct24Hour: null,
    volume24hTo: ''
  };

  message = message.split('~');
  
  result.fromSymbol = message[2];
  result.priceFlag = message[4];

  if (result.priceFlag !== '4') {
    result.price = message[5];
  }

  if (result.priceFlag === '4') {
    if (currentEpochTime - message[5] < 1000) {
      const oneDayPrePriceData = await axios.get(`${PRICE_HISTORICAL_URL}?fsym=${result.fromSymbol}&tsyms=${TO_SYMBOL}&ts=${parseInt(message[5], 10) - ONE_DAY}`);
      const oneDayPrePrice = parseFloat(oneDayPrePriceData.data[result.fromSymbol].KRW);
      let currentPrice;

      if (result.price !== '') {
        currentPrice = result.price;
      } else {
        const currentPriceData = await axios.get(`${PRICE_HISTORICAL_URL}?fsym=${result.fromSymbol}&tsyms=${TO_SYMBOL}&ts=${parseInt(message[5], 10)}`);
        currentPrice = parseFloat(currentPriceData.data[result.fromSymbol].KRW);
      }

      result.chagePct24Hour = (oneDayPrePrice - currentPrice) / oneDayPrePrice * 100;
    }
  } else {
    if (currentEpochTime - message[6] < 1000) {
      const oneDayPrePriceData = await axios.get(`${PRICE_HISTORICAL_URL}?fsym=${result.fromSymbol}&tsyms=${TO_SYMBOL}&ts=${parseInt(message[6], 10) - ONE_DAY}`);
      const oneDayPrePrice = parseFloat(oneDayPrePriceData.data[result.fromSymbol].KRW);
      let currentPrice;

      if (result.price !== '') {
        currentPrice = result.price;
      } else {
        const currentPriceData = await axios.get(`${PRICE_HISTORICAL_URL}?fsym=${result.fromSymbol}&tsyms=${TO_SYMBOL}&ts=${parseInt(message[6], 10)}`);
        currentPrice = parseFloat(currentPriceData.data[result.fromSymbol].KRW);
      }

      result.chagePct24Hour = (oneDayPrePrice - currentPrice) / oneDayPrePrice * 100;
    }
  }

  for (var i = message.length - 1 ; i > 0; i--) {
    if (isNaN(Number(message[i]))) {
      continue;
    }
    if ((Number(message[i]) && Number(message[i+1])) || (Number(message[i]) && Number(message[i-1]))) {
      if (message[i]-message[i+1] > message[i+1]*2 || message[i-1]*3 < message[i]) {
        result.volume24hTo = message[i];
        break;
      } 
    }
  }

  return result;

}