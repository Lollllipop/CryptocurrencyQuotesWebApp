import React, { Component } from 'react';
// import { connect } from 'react-redux';

import Title from '../components/Title';
import SearchBar from '../components/SearchBar';
import Content from '../components/Content';

// import List from '../components/List';

class MainView extends Component {
  render(){
    return (
      <div className='MainView container'>
        <SearchBar/>
        <Title/>
        <Content/>
        {/* </Footer> */}
        <div> Made by DahanChoe <i className="fas fa-plane"></i> </div>
      </div>
    );
  }
}

export default MainView;