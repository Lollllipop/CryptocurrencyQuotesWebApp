export const UN_INIT_VIEW = 'INIT_VIEW';
export const UN_INIT_DETAIL_VIEW = 'INIT_DETAIL_VIEW';  

export function unInitView() {
  return {
    type: UN_INIT_VIEW, 
    data: {
      error: '',
      coins10DisplayList: [],
      coinsNameList: [],
      coinsSymbolList: [],
      coinsImageUrlList: [],
      coinsIdList: [],
      coinsPriceHistoricalObject: {},
      pageCount: 0,
      socketCount: 0,
      onLoad: true,
      increaseFlag: []
    }
  };
}

export function unInitDetailView() {
  return {
    type: UN_INIT_DETAIL_VIEW, 
    data: {
      error: '',
      coinDisplayObject: {},
      coinHistoricalClosePriceList: [],
      lastMinute: '',
      onLoad: true,
    }
  };
}
