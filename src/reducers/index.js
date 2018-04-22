import { combineReducers } from 'redux';

import initReducer from './InitReducer';                                 // 이름 아무렇게 받아도 됨

const rootReducer = combineReducers({                     
  initReducer: initReducer
});

export default rootReducer;