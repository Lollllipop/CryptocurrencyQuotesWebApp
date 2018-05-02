import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { initDetailViewAsync } from '../actions';
// import { bindActionCreators } from 'redux';

import SearchBar from '../components/SearchBar';
import DetailTitle from '../components/DetailTitle';
import DetailGraph from '../components/DetailGraph';

class DetailView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: null
    };
  }

  componentDidMount() {
    const coinName = this.props.match.params.coinName; // 흠 여기서 근데 symbol이 아니고 name이 주로 들어온단 말이지..
    this.props.initDetailViewAsync(coinName);
    const socket = io('wss://streamer.cryptocompare.com'); // 처음에만 소켓 연결
    this.setState({
      socket: socket
    });
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  render(){
    // 다 state로 받아서 각각 component에 props로 넘길 것임
    return (
      <div className='DetailView container'>
        <SearchBar location={'detailView'}/>
        <DetailTitle data={this.props.coinDisplayObject}/>
        <DetailGraph data={this.props.coinHistoricalClosePriceList}/>
        <div> Made by DahanChoe <i className="fas fa-plane"></i> </div>
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    coinDisplayObject: state.detailReducer.coinDisplayObject,
    coinHistoricalClosePriceList: state.detailReducer.coinHistoricalClosePriceList,
    onLoad: state.detailReducer.onLoad,
    error: state.detailReducer.error,
    // increaseFlag: state.mainReducer.increaseFlag
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { 
      initDetailViewAsync
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);