import { 
  ON_CHANGE_SEARCHBAR_STATE
} from '../actions'; 

const initValue = {
  error: '',
  searchedCoinList: [],
  onLoad: false
};

export default function(state=initValue, action) {
  switch(action.type) {
  case ON_CHANGE_SEARCHBAR_STATE:      
    return {                                                           
      error: '',
      searchedCoinList: action.data.searchedCoinList,
      onLoad: action.data.onLoad
    };
  default:
    return state;
  }
}