import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initViewAsync } from '../actions';


class CoinsList extends Component {
  componentWillMount(){
    this.props.initViewAsync();
  }
  renderCoins(){
    console.log(this.props.coins);
    if(this.props.coins){
      return this.props.coins.map((v,i) => {
        return (
          <tr key={v.symbol}>
            <th scope="row">{i+1}</th>
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
    );
  }
}


function mapStateToProps(state){
  return {
    coins: state.initReducer.coinTop30List,
    error: state.initReducer.error
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    { 
      initViewAsync 
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList);