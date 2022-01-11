import React from "react";
import { Route, Link } from "react-router-dom";
import { Routes } from "react-router";
import Position from "./Position";
import User from "./User";
import { GlobalProvider } from "../Context/Global";
import { Menu, Layout } from "antd";

export default function Home() {
  const handleClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Sider>
        <Menu onClick={handleClick} defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Link to="/user">User</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/position">Position</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <GlobalProvider>
        <Layout.Content>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/user" element={<User />} />
            <Route path="/position" element={<Position />} />
          </Routes>
        </Layout.Content>
      </GlobalProvider>
    </Layout>
  );
}
