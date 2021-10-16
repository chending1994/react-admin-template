import React, { Component } from "react";
import { withRouter } from "react-router";
import { Modal} from 'antd'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from '../../utils/storageUtils'
import { formateDate } from "../../utils/dateUtils";
import { reqWeather } from "../../api";
import menuList from "../../config/menuConfig";
import LinkButton from "../LinkButton";
import "./index.less";

class Header extends Component {
  state = {
    // currentTime: formateDate(Date.now()), 
    // dayPictureUrl: "",
    // weather: "",
  };

  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title;
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title;
        }
      }
    });
    return title;
  };

  getWeather = async () => {
    // 调用接口请求异步获取数据
    const { dayPictureUrl, weather } = await reqWeather("北京");
    // 更新状态
    this.setState({ dayPictureUrl, weather });
  }

  logout = () => {
    // 显示确认框
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 跳转到login
        this.props.history.replace('/login')
      }
    })
  }

  componentDidMount() {
    // this.getTime();
    // this.getWeather();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const username = memoryUtils.user.username;
    // const { currentTime, dayPictureUrl, weather } = this.state;
    const title = this.getTitle();

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            {/* <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
