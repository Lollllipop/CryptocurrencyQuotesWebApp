import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initViewAsync } from '../actions';



class Content extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: 0, // pagination을 위한 변수 0=>1페이지(상위10) 1=>2페이지(10~20)
      nextPaginationButtonState: 'page-item',
      prevPaginationButtonState: 'page-item-hidden'
    };
  }

  componentDidMount(){
    this.props.initViewAsync();
  }

  nextPaginationHandler(){
    const totalPageCount = parseInt((this.props.coinsTotalCount.length-1)/10);
    if (totalPageCount == 0){
      this.setState({
        nextPaginationButtonState: 'page-item-hidden'
      });
    }else if ((this.state.page+1) == totalPageCount){
      this.setState({
        nextPaginationButtonState: 'page-item-hidden',
        prevPaginationButtonState: 'page-item',
        page: this.state.page + 1
      });
    }else{
      this.setState({
        nextPaginationButtonState: 'page-item',
        prevPaginationButtonState: 'page-item',
        page: this.state.page + 1
      });
    }
  }

  prevPaginationHandler(){
    const totalPageCount = parseInt((this.props.coinsTotalCount.length-1)/10);
    if (totalPageCount == 0){
      this.setState({
        prevPaginationButtonState: 'page-item-hidden'
      });
    }else if ((this.state.page-1) == 0){
      this.setState({
        nextPaginationButtonState: 'page-item',
        prevPaginationButtonState: 'page-item-hidden',
        page: this.state.page - 1
      });
    }else{
      this.setState({
        nextPaginationButtonState: 'page-item',
        prevPaginationButtonState: 'page-item',
        page: this.state.page - 1
      });
    }
  }

  renderCoins(){
    if(this.props.coins){
      return this.props.coins.slice(this.state.page*10, (this.state.page+1)*10).map((v,i) => {
        return (
          <tr key={v.symbol}>
            <th scope="row">{this.state.page*10+i+1}</th>
            <td>{v.name}</td>
            <td>{v.KRW.PRICE}</td>
            <td>{v.KRW.MKTCAP}</td>
            <td>{v.KRW.CHANGEPCT24HOUR}</td>
            <td>{v.KRW.VOLUME24HOURTO}</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div className="Content">
        <div className="PaginationButton">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className={this.state.prevPaginationButtonState}>
                <a className="page-link" href="#" aria-label="Previous" onClick={() => this.prevPaginationHandler()}>
                  <span aria-hidden="true"><i className="fas fa-angle-left"></i>  Prev Page</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className={this.state.nextPaginationButtonState}>
                <a className="page-link" href="#" aria-label="Next" onClick={() => this.nextPaginationHandler()}>
                  <span aria-hidden="true">Next Page    <i className="fas fa-angle-right"></i></span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="CoinsList">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">종류</th>
                <th scope="col">
                  최근거래가
                  <i className="fas fa-caret-up"></i>
                  <i className="fas fa-caret-down"></i>
                </th>
                <th scope="col">
                  시가총액
                  <i className="fas fa-caret-up"></i>
                  <i className="fas fa-caret-down"></i>
                </th>
                <th scope="col">
                  등락폭
                  <i className="fas fa-caret-up"></i>
                  <i className="fas fa-caret-down"></i>
                </th>
                <th scope="col">
                  거래금액(24H)
                  <i className="fas fa-caret-up"></i>
                  <i className="fas fa-caret-down"></i>
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


function mapStateToProps(state){
  return {
    coins: state.mainReducer.coinsTop10DisplayList,
    coinsTotalCount: state.mainReducer.coinsNameList,
    error: state.mainReducer.error
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    { 
      initViewAsync 
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);