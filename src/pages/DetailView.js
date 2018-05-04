import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { initDetailViewAsync } from '../actions';

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
    const coinName = this.props.match.params.coinName;
    this.props.initDetailViewAsync(coinName);
    const socket = io('wss://streamer.cryptocompare.com'); // 처음에만 소켓 연결
    this.setState({
      socket: socket
    });
  }

  shouldComponentUpdate(nextProps) { // componentDidUpdate에서 발생할 수 있는 무한 update 방지
    return (
      this.props.coinDisplayObject.name !== nextProps.coinDisplayObject.name ||
      this.props.match.params.coinName !== nextProps.match.params.coinName
    );
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  componentDidUpdate() { // 무한 update 가능성 가지고 있음
    console.log('componentDidUpdate');
    const coinName = this.props.match.params.coinName;
    this.props.initDetailViewAsync(coinName);
  }

  render(){

    console.log('render');
    
    const contentComponentClsName = this.props.onLoad ? 'detail-view-on-load' :'';

    return (
      <div className='DetailView container'>
        <SearchBar location={'detailView'}/>
        <div className={`detail-view-content-wrapper ${contentComponentClsName}`}>
          <DetailTitle data={this.props.coinDisplayObject}/>
          <DetailGraph data={this.props.coinHistoricalClosePriceList} lastMinute={this.props.lastMinute}/>
        </div>
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    coinDisplayObject: state.detailReducer.coinDisplayObject,
    coinHistoricalClosePriceList: state.detailReducer.coinHistoricalClosePriceList,
    lastMinute: state.detailReducer.lastMinute,
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