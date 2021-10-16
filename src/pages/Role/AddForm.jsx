import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const Item = Form.Item;

/*
添加分类的form组件
 */

export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
  };

  addForm = React.createRef();

  componentWillMount() {
    this.props.setForm(this.addForm);
  }

  render() {
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    };

    return (
      <Form ref={this.addForm}>
        <Item name="roleName" label="角色名称" {...formItemLayout}>
          <Input placeholder="请输入角色名称" />
        </Item>
      </Form>
    );
  }
}