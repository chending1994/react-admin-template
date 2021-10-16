import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

/*
添加分类的form组件
 */
export default class AddForm extends Component {

  constructor(props) {
    super(props)
    props.setForm(this.addFormRef);
  }
  state = {}

  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
  };


  addFormRef = React.createRef();

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  static getDerivedStateFromProps(props,state) {
    return true
  }


  componentDidMount() {

  }

  componentDidUpdate() {
    const { categoryName } = this.props;
    this.addFormRef.current.setFieldsValue({categoryName})
  }

  render() {
    const { categoryName } = this.props;
    return (
      <Form
        name="basic"
        onFinishFailed={this.onFinishFailed}
        initialValues={{categoryName}}
        ref={this.addFormRef}
      >
        <Form.Item
          name="categoryName"
          rules={[{ required: true, message: "分类名称必须输入" }]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    );
  }
}
