import Logo from "../ui/Logo";
import { Layout, Menu } from "antd";
import { sliderItemsGenerator } from "../../utils/sliderItemsGenerator";
import { AdminPats } from "../../routes/admin.routes";
import { FacultyPats } from "../../routes/faculty.routes";
import { StudentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const UserRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Slider = () => {
  const user = useAppSelector(selectCurrentUser);
  const role = `${user?.role}`;
  let sliderItems;

  switch (role) {
    case UserRole.ADMIN:
      sliderItems = sliderItemsGenerator(AdminPats, UserRole.ADMIN);
      break;
    case UserRole.FACULTY:
      sliderItems = sliderItemsGenerator(FacultyPats, UserRole.FACULTY);
      break;
    case UserRole.STUDENT:
      sliderItems = sliderItemsGenerator(StudentPaths, UserRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        height: "100vh",
        zIndex: 2,
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "#334454",
          margin: "16px 16px",
          borderRadius: "8px",
        }}
      >
        <Logo />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sliderItems}
      />
    </Sider>
  );
};

export default Slider;
