import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchBar from '../components/SearchBar';
import DetailTitle from '../components/DetailTitle';
import DetailGraph from '../components/DetailGraph';


class DetailView extends Component {
  render(){
    return (
      <div className='DetailView container'>
        <SearchBar/>
        <DetailTitle/>
        <DetailGraph/>
        {/* </Footer> */}
        <div> Made by DahanChoe <i className="fas fa-plane"></i> </div>
      </div>
    );
  }
}


export default connect(undefined,undefined)(DetailView);