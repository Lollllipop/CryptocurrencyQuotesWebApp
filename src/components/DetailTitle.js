import React, { Component } from 'react';
//import { connect } from 'react-redux';

class DetailTitle extends Component {
  render() {
    return (
      <div className="DetailTitle container">
        <div className="row">
          <div className="col-sm-4">
            <div className="coin-logo-box col">
              <img className="coin-logo" src="https://bitcoin.org/img/icons/opengraph.png"/>
            </div>
            <div className="coin-name col">
              <h5>비트코인 BTC</h5>
            </div>
          </div>
          <div className="col-sm">
            <div className="coin-price col">          	
              <i className="fas fa-won-sign"></i>
              <strong>8,156,000</strong>
              <small>2.21%</small>
              <i className="fas fa-caret-up"></i>
            </div>
            <div className="coin-sub-price col-10 row">
              <div className="col-sm">
                <p>8,156,000</p>
                <p>최고가</p>
              </div>
              <div className="col-sm">
                <p>8,156,000</p>
                <p>최저가</p>
              </div>
              <div className="col-sm">
                <p>8,156,000</p>
                <p>거래량</p>
              </div>
              <div className="col-sm">
                <p>8,156,000</p>
                <p>체결액</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailTitle;