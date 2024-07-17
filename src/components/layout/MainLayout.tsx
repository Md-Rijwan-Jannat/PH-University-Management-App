/* eslint-disable react-hooks/rules-of-hooks */

import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Slider from "./Slider";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;
const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{}}>
      <Slider />
      <Layout>
        <Header
          style={{
            padding: 0,
            width: "100%",
            zIndex: 1,
            display: "flex",
            gap: "16px",
            justifyContent: "end",
            alignItems: "center",
            paddingRight: "16px",
            height: "120px",
            position: "sticky",
            top: 0,
          }}
        >
          <Button size="middle" ghost danger onClick={handleLogout}>
            Logout
          </Button>
          <Button size="middle" type="primary" danger onClick={handleLogout}>
            Login
          </Button>
        </Header>
        <Content style={{ overflow: "initial" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              padding: 20,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
