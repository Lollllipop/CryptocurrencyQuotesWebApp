import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { preOnChangeState, onChangeSearchBarStateAsync } from '../actions';
import _ from 'lodash';

import SearchedList from './SearchedList';

class SearchBar extends Component {

  inputHandler(event) {
    this.props.onChangeSearchBarStateAsync(event);
  }

  render() {

    const searchIconClassName = this.props.onLoad ? 'loading' : 'fas fa-search';
    const searchedListClassName = this.props.onLoad ? 'searched-list-hidden' : 'searched-list-show';
    const debounceInputHandler = _.debounce((event) => this.inputHandler(event), 700);

    return (
      <div className="SearchBar">
        <nav className="navbar navbar-light justify-content-center bg-dark">
          <form className="search-bar form-inline form group col-12">
            <div className="search-container">
              <div className={`searched-list-wrapper ${searchedListClassName}`}>
                <SearchedList/>
              </div>
              <i className={searchIconClassName}></i>                            
              <input className="form-control" id='form-control' type="search" placeholder="Search" aria-label="Search" 
                onChange={(event) => debounceInputHandler(event.target.value)}
                onKeyPress={event => {
                  if (document.getElementById('form-control').value === '') {
                    this.props.preOnChangeState();
                  }
                  if (event.which === 13) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
          </form>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    onLoad: state.searchReducer.onLoad,
    error: state.searchReducer.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { 
      onChangeSearchBarStateAsync,
      preOnChangeState
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);