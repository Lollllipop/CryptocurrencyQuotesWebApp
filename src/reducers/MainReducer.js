import { 
  INIT_VIEW, 
  CLICK_BUTTON, 
  CLICK_BUTTON_MIDDLE_ACTION ,
  UPDATE_COINS_WITH_SOCKET
} from '../actions'; 

const initValue = {
  error: '',
  coins10DisplayList: [],
  coinsNameList: [],
  coinsSymbolList: [],
  coinsPriceHistoricalObject: {},
  pageCount: 0,
  socketCount: 0,
  onLoad: true,
  increaseFlag: [] // 1 : 증가  2 : 감소  4 : 변화x
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
      onLoad: action.data.onLoad,
      socketCount: state.socketCount,
      increaseFlag: [...state.increaseFlag]
    };
  case CLICK_BUTTON:
    return {
      error: '',
      coins10DisplayList: action.data.coins10DisplayList,
      coinsNameList: [...state.coinsNameList],
      coinsSymbolList: [...state.coinsSymbolList],
      coinsPriceHistoricalObject: action.data.coinsPriceHistoricalObject,
      pageCount: action.data.pageCount,
      onLoad: action.data.onLoad,
      socketCount: state.socketCount + 1,
      increaseFlag: [...state.increaseFlag]
    };
  case CLICK_BUTTON_MIDDLE_ACTION:
    return {
      error: '',
      coins10DisplayList: [...state.coins10DisplayList],
      coinsNameList: [...state.coinsNameList],
      coinsSymbolList: [...state.coinsSymbolList],
      coinsPriceHistoricalObject: state.coinsPriceHistoricalObject,
      pageCount: state.pageCount,
      onLoad: action.data.onLoad,
      socketCount: state.socketCount,
      increaseFlag: [...state.increaseFlag]
    };
  case UPDATE_COINS_WITH_SOCKET:
    return {
      error: '',
      coins10DisplayList: action.data.updatedCoins10DisplayList,
      coinsNameList: [...state.coinsNameList],
      coinsSymbolList: [...state.coinsSymbolList],
      coinsPriceHistoricalObject: state.coinsPriceHistoricalObject,
      pageCount: state.pageCount,
      onLoad: state.onLoad,
      socketCount: state.socketCount,
      increaseFlag: action.data.increaseFlag
    };
  default:
    return state;
  }
}