import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";

import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";
import Home from "../Home";
import Category from "../Category";
import Product from "../Product";
import Role from "../Role";
import User from "../User";
import Bar from "../Charts/bar";
import Line from "../Charts/line";
import Pie from "../Charts/pie";
import NotFound from "../NotFound";
import Order from "../Order";

import { Layout } from "antd";
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 20, background: "#fff" }}>
            <Switch>
              <Redirect from="/" exact to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Route path="/order" component={Order} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#cccccc" }}>
            Footer
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
