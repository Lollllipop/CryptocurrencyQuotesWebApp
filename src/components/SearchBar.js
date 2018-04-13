import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {
  constructor(props){                                                           
    super(props);
    this.state = { 
      loading: true                                                             
    };
  }
  
  render() {
    const clsName = this.state.loading ?
      'loading' : 'fas fa-search';
    return (
      <div className="SearchBar">
        <nav className="navbar navbar-light justify-content-center bg-dark">
          <form className="search-bar form-inline form group col-12">
            <div className="search-container">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
              <i className={clsName}></i>
            </div>
          </form>
        </nav>
      </div>
    );
  }
}

export default SearchBar;