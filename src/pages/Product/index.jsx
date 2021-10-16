import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import List from './list';

export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/product" exact={ true } component={ List } />
          <Route path="/product/addOrUpdate" component={ AddOrUpdate } />
          <Route path="/product/detail" component={ Detail } />
          <Redirect to="/product" />
        </Switch>
      </div>
    )
  }
}
