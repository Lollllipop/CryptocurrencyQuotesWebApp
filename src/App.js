import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import MainView from './pages/MainView';
// import DetailView from './pages/DetailView';
import { MainView, DetailView } from './pages';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={MainView}/>
          <Route path='/:coinName' component={DetailView}/>
        </Switch>
      </div>
    );
  }
}

export default App;
