import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initDetailViewAsync, unInitDetailView } from '../actions';

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
  }

  shouldComponentUpdate(nextProps) { // componentDidUpdate에서 발생할 수 있는 무한 update 방지
    return (
      this.props.coinDisplayObject.name !== nextProps.coinDisplayObject.name ||
      this.props.match.params.coinName !== nextProps.match.params.coinName
    );
  }

  componentWillUnmount() {
    this.props.unInitDetailView();
  }

  componentDidUpdate() {
    const coinName = this.props.match.params.coinName;
    this.props.initDetailViewAsync(coinName);
  }

  render(){

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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { 
      initDetailViewAsync,
      unInitDetailView
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);