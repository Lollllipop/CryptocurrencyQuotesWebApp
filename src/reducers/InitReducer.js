import { INIT_VIEW } from '../actions'; 

const initValue = {
  error: '',
  coinTop30List: []
};

export default function(state=initValue, action){
  switch(action.type){
  case INIT_VIEW:                                          
    return{                                                           
      error: '',
      coinTop30List: action.data                                
    };

  default:
    return state;
  }
}