import { INIT_VIEW } from '../actions'; 

const initValue = {
  error: '',
  coinsTop20DisplayList: [],
  coinsTop20NameList: []
};

export default function(state=initValue, action){
  switch(action.type){
  case INIT_VIEW:      
    // var parseCoinsName = action.data.map(v => v.name); 
    return{                                                           
      error: '',
      coinsTop20DisplayList: action.data.coinsTop20DisplayList,
      coinsTop20NameList: action.data.coinsTop20NameList
    };

  default:
    return state;
  }
}