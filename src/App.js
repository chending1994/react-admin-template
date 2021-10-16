import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './pages/Login/index';
import Admin from './pages/Admin/index';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
