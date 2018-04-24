import { INIT_VIEW, CLICK_BUTTON } from '../actions'; 

const initValue = {
  error: '',
  coins10DisplayList: [],
  coinsNameList: [],
  coinsSymbolList: [],
  pageCount: 0
};

export default function(state=initValue, action){
  switch(action.type){
  case INIT_VIEW:      
    return{                                                           
      error: '',
      coins10DisplayList: action.data.coins10DisplayList,
      coinsNameList: action.data.coinsNameList,
      coinsSymbolList: action.data.coinsSymbolList,
      pageCount: action.data.pageCount
    };
  case CLICK_BUTTON:
    return{
      error: '',
      coins10DisplayList: action.data.coins10DisplayList,
      coinsNameList: [...state.coinsNameList],
      coinsSymbolList: [...state.coinsSymbolList],
      pageCount: action.data.pageCount
    };
  default:
    return state;
  }
}