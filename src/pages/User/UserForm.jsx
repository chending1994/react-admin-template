import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

/*
添加/修改用户的form组件
 */

export default class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    roles: PropTypes.array.isRequired,
    user: PropTypes.object,
  };

  form = React.createRef()

  componentWillMount() {
    this.props.setForm(this.form);
  }

  render() {
    const { roles, user } = this.props;
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    };

    return (
      <Form {...formItemLayout} ref={this.form} initialValues={user}>
        <Item name='username' label="用户名">
          <Input placeholder="请输入用户名" />
        </Item>

        {user._id ? null : (
          <Item name='password' label="密码">
            <Input type="password" placeholder="请输入密码" />
          </Item>
        )}

        <Item name='phone' label="手机号">
          <Input placeholder="请输入手机号" />
        </Item>

        <Item name='email' label="邮箱">
          <Input placeholder="请输入邮箱" />
        </Item>

        <Item name='role_id' label="角色">
          <Select>
            {roles.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Item>
      </Form>
    );
  }
}

