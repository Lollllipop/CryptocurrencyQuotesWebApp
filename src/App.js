import React, { Component } from 'react';
import MainView from './pages/MainView';
import DetailView from './pages/DetailView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainView/>
        {/* CoinList와 CoinDetail 사이에 라우트 필요함 */}
        {/* <CoinDetail/> */}
      </div>
    );
  }
}

export default App;
