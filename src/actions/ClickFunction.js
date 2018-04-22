import axios from 'axios';
// import io from 'socket.io-client';

export const FETCH_COIN_TOP30_LIST = 'FETCH_COIN_TOP30_LIST';    

const COIN_TOP30_RANK_API_URL = 'https://api.coinmarketcap.com/v1/ticker/?convert=KRW&limit=30';

export function fetchCoinTop30List(){                                             
  const request = axios.get(COIN_TOP30_RANK_API_URL); 

  return {
    type: FETCH_COIN_TOP30_LIST,
    payload: request                                                            
  };
}