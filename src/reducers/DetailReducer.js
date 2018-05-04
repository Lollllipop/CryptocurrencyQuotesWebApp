import { 
  INIT_DETAIL_VIEW, 
  INIT_DETAIL_MIDDLE_ACTION 
} from '../actions'; 

const initValue = {
  error: '',
  coinDisplayObject: {},
  coinHistoricalClosePriceList: [],
  lastMinute: '',
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
      lastMinute: action.data.lastMinute,
      onLoad: action.data.onLoad,
      // increaseFlag: [...state.increaseFlag]
    };
  case INIT_DETAIL_MIDDLE_ACTION:
    return {
      error: '',
      coinDisplayObject: state.coinDisplayObject,
      coinHistoricalClosePriceList: [...state.coinHistoricalClosePriceList],
      lastMinute: state.lastMinute,
      onLoad: action.data.onLoad
    };
  default:
    return state;
  }
}