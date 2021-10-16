import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import menuList from '../../config/menuConfig'
import memoryUtils from "../../utils/memoryUtils";
import logo from "../../assets/images/logo.png";
import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {

  hasAuth = (item) => {
    const { key, isPublic } = item
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if(username==='admin' || isPublic || menus.indexOf(key)!==-1) {
      return true
    } else if(item.children){ // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
    }

    return false
  }

  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    
    return menuList.reduce((pre, item)=> {
      if (this.hasAuth(item)) {
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key} icon={<item.icon />}>
              <Link to={item.key}>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.openKey = item.key
          }
  
          // 向pre添加<SubMenu>
          pre.push((
            <SubMenu
              icon={<item.icon />}
              key={item.key}
              title={
                <span>
              {/* <Icon type={item.icon}/> */}
              <span>{item.title}</span>
            </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      }
      return pre
    },[])
  }
  
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }
  componentDidMount() {
  }

  render() {
    let path = this.props.location.pathname;
    if (path.indexOf('/product') !== -1) {
      path = '/product'
    }
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav)