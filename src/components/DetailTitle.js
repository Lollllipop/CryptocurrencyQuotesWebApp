import React, { Component } from 'react';
import { priceUSD2KRW } from '../utils';

class DetailTitle extends Component {
  render() {
    let priceData = {};

    if (this.props.data.data) {
      priceData = this.props.data.data[Object.keys(this.props.data.data)[0]].KRW;
    }

    return (
      
      <div className="DetailTitle container">
        <div className="row">
          <div className="col-sm-4">
            <div className="coin-logo-box col">
              <img className="coin-logo" src={this.props.data.img} alt='logo'/>
            </div>
            <div className="coin-name col">
              <h5>{this.props.data.name} ({this.props.data.symbol})</h5>
            </div>
          </div>
          <div className="col-sm">
            <div className="coin-price col">          	
              {/* <i className="fas fa-won-sign"></i> */}
              <strong>{priceUSD2KRW(priceData.PRICE)}</strong>
              <small>{priceData.CHANGEPCT24HOUR + '%'}</small>
              <i className="fas fa-caret-up"></i>
            </div>
            <div className="coin-sub-price col-12 row">
              <div className="col-sm">
                <p>{priceUSD2KRW(priceData.HIGH24HOUR)}</p>
                <p>최고가(24H)</p>
              </div>
              <div className="col-sm">
                <p>{priceUSD2KRW(priceData.LOW24HOUR)}</p>
                <p>최저가(24H)</p>
              </div>
              <div className="col-sm">
                <p>{priceUSD2KRW(priceData.MKTCAP, 'marketCap')}</p>
                <p>시가총액</p>
              </div>
              <div className="col-sm">
                <p>{priceUSD2KRW(priceData.VOLUME24HOURTO)}</p>
                <p>체결액(24H)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailTitle;