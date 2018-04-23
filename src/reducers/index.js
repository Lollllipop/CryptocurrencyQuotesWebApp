import { combineReducers } from 'redux';

import mainReducer from './MainReducer';                                 // 이름 아무렇게 받아도 됨

const rootReducer = combineReducers({                     
  mainReducer: mainReducer
});

export default rootReducer;