import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Select, Input } from "antd";

const Option = Select.Option;

/*
添加分类的form组件
 */
export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    categorys: PropTypes.array.isRequired, // 一级分类的数组
    parentId: PropTypes.string.isRequired, // 父分类的ID
  };

  formRef = React.createRef();

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  componentWillMount() {
    this.props.setForm(this.formRef);
  }

  render() {
    const { categorys, parentId } = this.props;

    return (
      <Form
        name="basic"
        onFinishFailed={this.onFinishFailed}
        ref={this.formRef}
        initialValues={{ parentId }}
      >
        <Form.Item name="parentId">
          <Select>
            <Option value="0">一级分类</Option>
            {categorys.map((c,index) => (
              <Option key={index} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

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
