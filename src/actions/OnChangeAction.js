export const ON_CHANGE_SEARCHBAR_STATE = 'ON_CHANGE_SEARCHBAR_STATE';  
export const PRE_ON_CHANGE_STATE = 'PRE_ON_CHANGE_STATE';

export function preOnChangeState() {
  return {
    type: PRE_ON_CHANGE_STATE,
    data: {
      onLoad: true
    }
  };
}

export function onChangeSearchBarStateAsync(targetValue) {
  
  return (dispatch, getState) => {

    if (targetValue) {
      const currentState = getState();
      const expr = /\s/g;
      const coinsNameList = currentState.mainReducer.coinsNameList;
      targetValue = targetValue.toLowerCase().replace(expr, '');
      let searchedCoinList = [];
  
      searchedCoinList = coinsNameList.filter(value => {
        value = value.toLowerCase().replace(expr, '');
        return value.includes(targetValue); 
      });
  
      const searched10CoinList = searchedCoinList.slice(0,10);
  
      dispatch({
        type: ON_CHANGE_SEARCHBAR_STATE, 
        data: {
          searchedCoinList: searched10CoinList,
          onLoad: false
        }
      }); 
    } else {
      dispatch({
        type: ON_CHANGE_SEARCHBAR_STATE, 
        data: {
          searchedCoinList: [],
          onLoad: false
        }
      }); 
    }

  };

}