import { 
  INIT_VIEW, 
  CLICK_BUTTON, 
  CLICK_BUTTON_MIDDLE_ACTION,
  UPDATE_COINS_WITH_SOCKET,
  INIT_DETAIL_VIEW_COIN_LIST
} from '../actions'; 

const initValue = {
  error: '',
  coins10DisplayList: [],
  coinsNameList: [],
  coinsSymbolList: [],
  coinsImageUrlList: [],
  coinsIdList: [],
  coinsPriceHistoricalObject: {},
  pageCount: 0,
  socketCount: 0,
  onLoad: true,
  increaseFlag: []
};

export default function(state=initValue, action) {
  switch(action.type) {
  case INIT_VIEW:      
    return {                                                           
      error: '',
      coins10DisplayList: action.data.coins10DisplayList,
      coinsNameList: action.data.coinsNameList,
      coinsSymbolList: action.data.coinsSymbolList,
      coinsImageUrlList: action.data.coinsImageUrlList,
      coinsIdList: action.data.coinsIdList,
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
      coinsImageUrlList: [...state.coinsImageUrlList],
      coinsIdList: [...state.coinsIdList],
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
      coinsImageUrlList: [...state.coinsImageUrlList],
      coinsIdList: [...state.coinsIdList],
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
      coinsImageUrlList: [...state.coinsImageUrlList],
      coinsIdList: [...state.coinsIdList],
      coinsPriceHistoricalObject: state.coinsPriceHistoricalObject,
      pageCount: state.pageCount,
      onLoad: state.onLoad,
      socketCount: state.socketCount,
      increaseFlag: action.data.increaseFlag
    };
  case INIT_DETAIL_VIEW_COIN_LIST:
    return {
      error: '',
      coins10DisplayList: [...state.coins10DisplayList],
      coinsNameList: action.data.coinsNameList,
      coinsSymbolList: [...state.coinsSymbolList],
      coinsImageUrlList: [...state.coinsImageUrlList],
      coinsIdList: [...state.coinsIdList],
      coinsPriceHistoricalObject: state.coinsPriceHistoricalObject,
      pageCount: state.pageCount,
      onLoad: state.onLoad,
      socketCount: state.socketCount,
      increaseFlag: state.increaseFlag
    };
  default:
    return state;
  }
}