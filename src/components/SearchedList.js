import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchedList extends Component {

  renderCoinsName() {
    return this.props.searchedCoinList.map(value => {
      return (
        <a href="#" key={value} className="list-group-item list-group-item-action">{value}</a>
      );
    });
  }

  render() {
    return (
      <div className="SearchedList">
        <div className="list-group">
          {this.renderCoinsName()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchedCoinList: state.searchReducer.searchedCoinList,
    error: state.searchReducer.error
  };
}

export default connect(mapStateToProps)(SearchedList);