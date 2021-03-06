export const ON_CHANGE_SEARCHBAR_STATE = 'ON_CHANGE_SEARCHBAR_STATE';  

export function onChangeSearchBarStateAsync(targetValue) {
  return (dispatch, getState) => {

    if (targetValue) {
      targetValue = targetValue.toLowerCase().replace(expr, '');
      const currentState = getState();
      const expr = /\s/g;
      const coinsNameList = currentState.mainReducer.coinsNameList;
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