import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SearchedList extends Component {

  renderCoinsName() {
    return this.props.searchedCoinList.map(value => {
      return (
        <Link to={`/${value}`} key={value} className="list-group-item list-group-item-action">{value}</Link>
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