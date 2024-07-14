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
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
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
            height: "100px",
          }}
        >
          <Button size="middle" ghost danger onClick={handleLogout}>
            Logout
          </Button>
          <Button size="middle" type="primary" danger onClick={handleLogout}>
            Login
          </Button>
        </Header>
        <Content style={{ margin: "80px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
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
