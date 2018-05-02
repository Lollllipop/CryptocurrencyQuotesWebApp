import { combineReducers } from 'redux';

import mainReducer from './MainReducer';
import searchReducer from './SearchReducer';
import detailReducer from './DetailReducer';

const rootReducer = combineReducers({                     
  mainReducer: mainReducer,
  searchReducer: searchReducer,
  detailReducer: detailReducer
});

export default rootReducer;