import { INIT_VIEW, CLICK_BUTTON, CLICK_BUTTON_MIDDLE_ACTION } from '../actions'; 

const initValue = {
  error: '',
  coins10DisplayList: [],
  coinsNameList: [],
  coinsSymbolList: [],
  coinsPriceHistoricalObject: {},
  pageCount: 0,
  onLoad: true
};

export default function(state=initValue, action) {
  switch(action.type) {
  case INIT_VIEW:      
    return {                                                           
      error: '',
      coins10DisplayList: action.data.coins10DisplayList,
      coinsNameList: action.data.coinsNameList,
      coinsSymbolList: action.data.coinsSymbolList,
      coinsPriceHistoricalObject: action.data.coinsPriceHistoricalObject,
      pageCount: action.data.pageCount,
      onLoad: action.data.onLoad
    };
  case CLICK_BUTTON:
    return {
      error: '',
      coins10DisplayList: action.data.coins10DisplayList,
      coinsNameList: [...state.coinsNameList],
      coinsSymbolList: [...state.coinsSymbolList],
      coinsPriceHistoricalObject: action.data.coinsPriceHistoricalObject,
      pageCount: action.data.pageCount,
      onLoad: action.data.onLoad
    };
  case CLICK_BUTTON_MIDDLE_ACTION:
    return {
      error: '',
      coins10DisplayList: [...state.coins10DisplayList],
      coinsNameList: [...state.coinsNameList],
      coinsSymbolList: [...state.coinsSymbolList],
      coinsPriceHistoricalObject: [...state.coinsPriceHistoricalObject],
      pageCount: state.pageCount,
      onLoad: action.data.onLoad
    };
  default:
    return state;
  }
}