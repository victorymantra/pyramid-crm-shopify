import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import OrdersDisplay from "./components/OrdersDisplay";

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ padding: 0, background: "#fff" }}>
          <div
            style={{
              float: "left",
              width: 120,
              height: 31,
              margin: "16px 24px 16px 0",
              background: "rgba(0, 0, 0, 0.2)",
              color: "blue",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Pyramid CRM
          </div>
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/customers">Customers</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/products">Products</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/orders">Orders</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/customers">Customers</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<OrdersDisplay />} />
                <Route path="/customers" element={<div>Customers Page</div>} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
