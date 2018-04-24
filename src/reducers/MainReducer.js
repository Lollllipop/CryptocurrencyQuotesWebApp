import { INIT_VIEW } from '../actions'; 

const initValue = {
  error: '',
  coinsTop10DisplayList: [],
  coinsNameList: [],
  pageCountFlag: 0
};

export default function(state=initValue, action){
  switch(action.type){
  case INIT_VIEW:      
    // var parseCoinsName = action.data.map(v => v.name); 
    return{                                                           
      error: '',
      coinsTop10DisplayList: action.data.coinsTop10DisplayList,
      coinsNameList: action.data.coinsNameList,
      pageCountFlag: action.data.pageCountFlag
    };

  default:
    return state;
  }
}