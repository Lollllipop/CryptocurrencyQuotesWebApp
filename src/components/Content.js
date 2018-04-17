import React, { Component } from 'react';
import PaginationButton from './PaginationButton';
import CoinsList from './CoinsList';
//import { connect } from 'react-redux';

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <PaginationButton/>
        <CoinsList/>
      </div>
    );
  }
}

export default Content;