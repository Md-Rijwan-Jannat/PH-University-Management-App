import { Layout, Menu } from "antd";
import Logo from "../ui/Logo";
import { sliderItemsGenerator } from "../../utils/sliderItemsGenerator";
import { AdminPats } from "../../routes/admin.routes";
import { FacultyPats } from "../../routes/faculty.routes";
import { StudentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hook";
import { currentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const UserRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Slider = () => {
  const user = useAppSelector(currentUser);
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
    <Sider>
      <Logo />
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
