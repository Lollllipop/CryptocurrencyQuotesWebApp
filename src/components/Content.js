import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initViewAsync, ClickButtonAsync } from '../actions';
import { priceUSD2KRW, priceUSD2Number } from '../utils';

import Chart from './ListChart';

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0, // pagination을 위한 변수 0=>1페이지(상위10) 1=>2페이지(10~20)
      listOrderFlag: '',
      listOrderFlagClass: {PRICE:['', ''], MKTCAP:['', ''], CHANGEPCT24HOUR:['', ''], VOLUME24HOURTO:['', '']},
      selectedListHead: '',
      nextPaginationButtonState: 'page-item',
      prevPaginationButtonState: 'page-item-hidden',
    };
  }

  componentDidMount() {
    this.props.initViewAsync();
  }

  nextPaginationHandler() {
    this.props.ClickButtonAsync('next');
    const totalPageCount = parseInt(((this.props.coinsTotalCount.length - 1) / 10), 10);
    if (totalPageCount === 0) {
      this.setState({
        nextPaginationButtonState: 'page-item-hidden',
        listOrderFlag: '',
        listOrderFlagClass: {PRICE:['', ''], MKTCAP:['', ''], CHANGEPCT24HOUR:['', ''], VOLUME24HOURTO:['', '']}
      });
    } else if ((this.state.page + 1) === totalPageCount) {
      this.setState({
        nextPaginationButtonState: 'page-item-hidden',
        prevPaginationButtonState: 'page-item',
        page: this.state.page + 1,
        listOrderFlag: '',
        listOrderFlagClass: {PRICE:['', ''], MKTCAP:['', ''], CHANGEPCT24HOUR:['', ''], VOLUME24HOURTO:['', '']}
      });
    } else {
      this.setState({
        nextPaginationButtonState: 'page-item',
        prevPaginationButtonState: 'page-item',
        page: this.state.page + 1,
        listOrderFlag: '',
        listOrderFlagClass: {PRICE:['', ''], MKTCAP:['', ''], CHANGEPCT24HOUR:['', ''], VOLUME24HOURTO:['', '']}
      });
    }
  }

  prevPaginationHandler() {
    this.props.ClickButtonAsync('prev');
    const totalPageCount = parseInt(((this.props.coinsTotalCount.length - 1) / 10), 10);
    if (totalPageCount === 0) {
      this.setState({
        prevPaginationButtonState: 'page-item-hidden',
        listOrderFlag: '',
        listOrderFlagClass: {PRICE:['', ''], MKTCAP:['', ''], CHANGEPCT24HOUR:['', ''], VOLUME24HOURTO:['', '']}
      });
    } else if ((this.state.page - 1) === 0) {
      this.setState({
        nextPaginationButtonState: 'page-item',
        prevPaginationButtonState: 'page-item-hidden',
        page: this.state.page - 1,
        listOrderFlag: '',
        listOrderFlagClass: {PRICE:['', ''], MKTCAP:['', ''], CHANGEPCT24HOUR:['', ''], VOLUME24HOURTO:['', '']}
      });
    } else {
      this.setState({
        nextPaginationButtonState: 'page-item',
        prevPaginationButtonState: 'page-item',
        page: this.state.page - 1,
        listOrderFlag: '',
        listOrderFlagClass: {PRICE:['', ''], MKTCAP:['', ''], CHANGEPCT24HOUR:['', ''], VOLUME24HOURTO:['', '']}
      });
    }
  }

  listOrderHandler(selectedListHead) {
    let newListOrderFlagClass = {PRICE:['', ''], MKTCAP:['', ''], CHANGEPCT24HOUR:['', ''], VOLUME24HOURTO:['', '']}; // 항상 초기화
    if (this.state.listOrderFlag === '') {
      newListOrderFlagClass[selectedListHead][1] = 'desc';
      this.setState({
        listOrderFlag: 'desc', // 첫 클릭시 기본 내림차순
        selectedListHead: selectedListHead,
        listOrderFlagClass: newListOrderFlagClass
      });
    } else if (this.state.selectedListHead === selectedListHead && this.state.listOrderFlag === 'asc') {
      newListOrderFlagClass[selectedListHead][1] = 'desc';
      this.setState({
        listOrderFlag: 'desc',
        selectedListHead: selectedListHead,
        listOrderFlagClass: newListOrderFlagClass
      });
    } else if (this.state.selectedListHead === selectedListHead && this.state.listOrderFlag === 'desc') {
      newListOrderFlagClass[selectedListHead][0] = 'asc';
      this.setState({
        listOrderFlag: 'asc',
        selectedListHead: selectedListHead,
        listOrderFlagClass: newListOrderFlagClass
      });
    } else {
      newListOrderFlagClass[selectedListHead][1] = 'desc';
      this.setState({ // 다른 컬럼을 처음 클릭한 경우
        listOrderFlag: 'desc', // 내림차순으로 항상 시작
        selectedListHead: selectedListHead,
        listOrderFlagClass: newListOrderFlagClass
      });
    }
  }

  renderCoins() {
    if (this.props.coins.length !== 0) {
      const coins = this.props.coins;
      if (this.state.listOrderFlag === ''){
        // 첫 로딩은 그냥 pass
      } else if (this.state.listOrderFlag === 'asc') {
        coins.sort((a,b) => priceUSD2Number(a.KRW[this.state.selectedListHead], this.state.selectedListHead) > priceUSD2Number(b.KRW[this.state.selectedListHead]), this.state.selectedListHead);
      } else if (this.state.listOrderFlag === 'desc') {
        coins.sort((a,b) => priceUSD2Number(a.KRW[this.state.selectedListHead], this.state.selectedListHead) < priceUSD2Number(b.KRW[this.state.selectedListHead]), this.state.selectedListHead);
      }
      return coins.map((v, i) => {
        return (
          <tr key={v.symbol}>
            <th scope="row">{this.state.page * 10 + i + 1}</th>
            <td align='left'>{v.name}</td>
            <td align='right'>{priceUSD2KRW(v.KRW.PRICE)}</td>
            <td align='right'>{priceUSD2KRW(v.KRW.MKTCAP, 'marketCap')}</td>
            <td align='right'>{v.KRW.CHANGEPCT24HOUR + '%'}</td>
            <td align='right'>{priceUSD2KRW(v.KRW.VOLUME24HOURTO)}</td>
            <td><Chart data={this.props.coinsPriceHistoricalObject[v.symbol]}/></td>
          </tr>
        );
      });
    } else { // 로딩 모두 안되었을시 예비 테이블
      const tmp = [1,2,3,4,5,6,7,8,9,10];
      return tmp.map((v, i) => {
        return (
          <tr key={i}>
            <th scope="row">-</th>
            <td align='left'>-</td>
            <td align='right'>-</td>
            <td align='right'>-</td>
            <td align='right'>-</td>
            <td align='right'>-</td>
            <td></td>
          </tr>
        );
      });
    }
  }

  render() {

    const contentComponentClsName = this.props.onLoad ? 'on-load' :'';
    const spinnerClsName = this.props.onLoad ? 'content-loading' : '';

    return (
      <div className="Content">
        <i className={spinnerClsName}></i>
        <div className={`PaginationButton ${contentComponentClsName}`}>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className={this.state.prevPaginationButtonState}>
                <a className="page-link" href="#" aria-label="Previous" onClick={() => this.prevPaginationHandler()}>
                  <span aria-hidden="true"><i className="fas fa-angle-left"></i>  이전</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className={this.state.nextPaginationButtonState}>
                <a className="page-link" href="#" aria-label="Next" onClick={() => this.nextPaginationHandler()}>
                  <span aria-hidden="true">다음    <i className="fas fa-angle-right"></i></span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={`CoinsList ${contentComponentClsName}`}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">종류</th>
                <th scope="col" onClick={() => this.listOrderHandler('PRICE')}>
                  최근거래가
                  <i className={`fas fa-caret-up ${this.state.listOrderFlagClass.PRICE[0]}`}></i>
                  <i className={`fas fa-caret-down ${this.state.listOrderFlagClass.PRICE[1]}`}></i>
                </th>
                <th scope="col" onClick={() => this.listOrderHandler('MKTCAP')}>
                  시가총액
                  <i className={`fas fa-caret-up ${this.state.listOrderFlagClass.MKTCAP[0]}`}></i>
                  <i className={`fas fa-caret-down ${this.state.listOrderFlagClass.MKTCAP[1]}`}></i>
                </th>
                <th scope="col" onClick={() => this.listOrderHandler('CHANGEPCT24HOUR')}>
                  등락폭
                  <i className={`fas fa-caret-up ${this.state.listOrderFlagClass.CHANGEPCT24HOUR[0]}`}></i>
                  <i className={`fas fa-caret-down ${this.state.listOrderFlagClass.CHANGEPCT24HOUR[1]}`}></i>
                </th>
                <th scope="col" onClick={() => this.listOrderHandler('VOLUME24HOURTO')}>
                  거래금액(24H)
                  <i className={`fas fa-caret-up ${this.state.listOrderFlagClass.VOLUME24HOURTO[0]}`}></i>
                  <i className={`fas fa-caret-down ${this.state.listOrderFlagClass.VOLUME24HOURTO[1]}`}></i>
                </th>
                <th scope="col">가격 추세(3일)</th>
              </tr>
            </thead>
            <tbody>
              {this.renderCoins()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    coins: state.mainReducer.coins10DisplayList,
    coinsTotalCount: state.mainReducer.coinsNameList,
    coinsPriceHistoricalObject: state.mainReducer.coinsPriceHistoricalObject,
    onLoad: state.mainReducer.onLoad,
    error: state.mainReducer.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { 
      initViewAsync,
      ClickButtonAsync
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);