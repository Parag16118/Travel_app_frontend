import React, { Component } from 'react';
import Header from './components/Header'; 
import SelectForm from './components/selectform'; 
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './components/main'


class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div>
          <Header/>   
            <Switch>
              <Route path="/home" component={Main} />
              <Redirect to="/home" />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
