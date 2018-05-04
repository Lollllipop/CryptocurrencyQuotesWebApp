import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { preOnChangeState, onChangeSearchBarStateAsync } from '../actions';
import _ from 'lodash';

import SearchedList from './SearchedList';

class SearchBar extends Component {

  inputHandler(event) {
    this.props.onChangeSearchBarStateAsync(event);
  }

  componentDidMount() {
    document.getElementById('searched-list-wrapper').className = 'searched-list-hidden';
  }

  render() {
    const searchIconClassName = this.props.onLoad ? 'loading' : 'fas fa-search';
    const searchedListClassName = this.props.onSearch ? 'searched-list-show' : 'searched-list-hidden';
    const homeButtonClassName = this.props.location ? 'home-button-show' : 'home-button-hidden';
    const debounceInputHandler = _.debounce((event) => this.inputHandler(event), 700);

    return (
      <div className="SearchBar">
        <nav className="navbar navbar-light justify-content-center bg-dark">
          <Link className={`fas fa-home ${homeButtonClassName}`} to='/'></Link>
          <form className="search-bar form-inline form group col-12">
            <div className="search-container">
              <div className={`searched-list-wrapper ${searchedListClassName}`} id='searched-list-wrapper'>
                <SearchedList />
              </div>
              <i className={searchIconClassName}></i>                            
              <input className="form-control" id='form-control' autoComplete="off" type="search" placeholder="Search" aria-label="Search"
                onChange={(event) => debounceInputHandler(event.target.value)}
                onKeyPress={event => {
                  if (event.which === 13) {
                    event.preventDefault();
                    return;
                  }
                  if (document.getElementById('form-control').value === '') {
                    this.props.preOnChangeState();
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
    onSearch: state.searchReducer.onSearch,
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