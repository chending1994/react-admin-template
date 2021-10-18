import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { reqLogin } from "../../api/index";
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import logo from "../../assets/images/logo.png";
import "./login.less";

export default class Login extends Component {
  onFinish = async (values) => {
    const { username, password } = values;
    const data = await reqLogin(username, password);
    if (data.status === 0) {
      message.success('登陆成功')
      
      // 保存user
      const user = data.data;
      memoryUtils.user = user; // 保存在内存中
      storageUtils.saveUser(user); // 保存到local中

      this.props.history.push("/");
    } else {
      message.error(data.msg);
    }
    console.log("data", data);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback("密码必须输入");
    } else if (value.length < 4) {
      callback("密码长度不能小于4位");
    } else if (value.length > 12) {
      callback("密码长度不能大于12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须是英文、数字或下划线组成");
    } else {
      callback(); // 验证通过
    }
    // callback('xxxx') // 验证失败, 并指定提示的文本
  };
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
            className="login-form"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "用户名必须输入" },
                { min: 4, message: "用户名至少4位" },
                { max: 12, message: "用户名最多12位" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名必须是英文、数字或下划线组成",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="用户名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  validator: this.validatePwd,
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
