import React, { Component } from 'react';
import CoinList from './containers/CoinList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CoinList/>
        {/* CoinList와 CoinDetail 사이에 라우트 필요함 */}
        {/* <CoinDetail/> */}
      </div>
    );
  }
}

export default App;
