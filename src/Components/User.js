import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Modal, Button, Space, Table } from "antd";
import { Form, Input, InputNumber } from "antd";
import { GlobalContext } from "../Context/Global";
import { Select } from "antd";
import { addUser, selectedUser, deleteUser, editUser } from "../Action/Action";

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

export default function User() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
  const [myform] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    if (isModalVisible) {
      if (state.selectedUser) {
        myform.setFieldsValue(state.selectedUser);
      }
    } else {
      myform.resetFields();
    }
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(selectedUser());
  };

  const handleFinish = (values) => {
    console.log("form Values: ", values);
    if (state.selectedUser) {
      let actionId = state.selectedUser.id;
      const user = { id: actionId, ...values };
      console.log("Update user: ", user);
      dispatch(editUser(user));
      myform.resetFields();
    } else {
      let lastId = state.users.length
        ? state.users[state.users.length - 1].id + 1
        : 1;
      const newUser = { id: lastId, ...values };
      console.log("New user: ", newUser);
      dispatch(addUser(newUser));
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Yaş",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Position",
      dataIndex: "position_id",
      key: "position",
      render: (text, record, index) => {
        return record.position_id
          ? state.positions.find((pos) => pos.id === record.position_id)
              .position
          : "No position";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div>
            <button
              onClick={() => {
                dispatch(selectedUser(record));
                showModal();
              }}
            >
              Edit
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                dispatch(deleteUser(record.id));
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        title={state.selectedUser === null ? "Create user" : "Edit user"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={myform}
          onFinish={handleFinish}
          initialValues={{ name: "", age: 0 }}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Position" name="position_id">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {state.positions.map((item) => (
                <Option value={item.id}>{item.position}</Option>
              ))}
            </Select>
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "end" }}>
            {state.selectedUser && (
              <>
                <span style={{ flexGrow: 1 }}></span>
              </>
            )}
            <Button onClick={handleCancel}>Cancel</Button>
            <Button htmlType="submit">Ok</Button>
          </div>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        Create User
      </Button>
      <Table columns={columns} dataSource={state.users} />
    </div>
  );
}
