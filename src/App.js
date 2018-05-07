import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainView, DetailView } from './pages';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={MainView}/>
        <Route path='/:coinName' component={DetailView}/>
      </Switch>
    </div>
  );
}
