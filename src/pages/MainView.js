import React, { Component } from 'react';

import Title from '../components/Title';
import SearchBar from '../components/SearchBar';
import Content from '../components/Content';
// import Footer from '../components/Footer';

// import List from '../components/List';

class MainView extends Component {
  render(){
    return (
      <div className='MainView container'>
        <SearchBar/>
        <Title/>
        <Content/>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default MainView;