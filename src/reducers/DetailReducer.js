import { INIT_DETAIL_VIEW } from '../actions'; 

const initValue = {
  error: '',
  coinDisplayObject: {},
  coinHistoricalClosePriceList: [],
  onLoad: true,
  // increaseFlag: []
};

export default function(state=initValue, action) {
  switch(action.type) {
  case INIT_DETAIL_VIEW:      
    return {                                                           
      error: '',
      coinDisplayObject: action.data.coinDisplayObject,
      coinHistoricalClosePriceList: action.data.coinHistoricalClosePriceList,
      onLoad: action.data.onLoad,
      // increaseFlag: [...state.increaseFlag]
    };
  default:
    return state;
  }
}