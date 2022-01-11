import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Modal, Button, Table } from "antd";
import { Form, Input } from "antd";
import { GlobalContext } from "../Context/Global";
import {
  deletePosition,
  editPosition,
  selectedPosition,
  addPosition,
} from "../Action/Action";

export default function Position() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
  const [myform] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) {
      if (state.selectedPosition) {
        myform.setFieldsValue(state.selectedPosition);
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
    dispatch(selectedPosition());
  };

  const handleFinish = (values) => {
    console.log("form Values: ", values);
    if (state.selectedPosition) {
      let actionId = state.selectedPosition.id;
      const position = { id: actionId, ...values };
      console.log("Update position: ", position);
      dispatch(editPosition(position));
    } else {
      let lastId = state.positions.length
        ? state.positions[state.positions.length - 1].id + 1
        : 1;
      const newPosition = { id: lastId, ...values };
      console.log("New Position: ", newPosition);
      dispatch(addPosition(newPosition));
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
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div>
            <button
              onClick={() => {
                dispatch(selectedPosition(record));
                showModal();
              }}
            >
              Edit
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                dispatch(deletePosition(record.id));
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
        title={
          state.selectedPosition === null ? "Create Position" : "Edit Position"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={myform}
          onFinish={handleFinish}
          initialValues={{ position: "" }}
        >
          <Form.Item label="position" name="position">
            <Input />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "end" }}>
            {state.selectedPosition && (
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
        Create Position
      </Button>
      <Table columns={columns} dataSource={state.positions} />
    </div>
  );
}
