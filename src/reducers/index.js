import { combineReducers } from 'redux';

import mainReducer from './MainReducer';
import searchReducer from './SearchReducer';

const rootReducer = combineReducers({                     
  mainReducer: mainReducer,
  searchReducer: searchReducer
});

export default rootReducer;