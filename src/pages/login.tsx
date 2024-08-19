import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IUser } from "../types/authTypes";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login: React.FC = () => {
  const [loginF, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    userId: "A-0001",
    password: "Admin01@",
  };

  const onSubmit = async (formData: FieldValues) => {
    const userId = toast.loading("Logging in...");

    try {
      const userInfo = {
        id: formData.userId,
        password: formData.password,
      };

      const res = await loginF(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as IUser;

      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success("Successfully logged in", { id: userId });
      navigate(`/${user.role}/dashboard`);
    } catch (error: any) {
      // Error handling is moved to the useEffect hook
      toast.dismiss(userId);
    }
  };

  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
        }}
      >
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput
            type={"text"}
            name={"userId"}
            label={"User ID:"}
            placeholder={""}
          ></PHInput>
          <PHInput
            type={"text"}
            name={"password"}
            label={"Password:"}
            placeholder={""}
          ></PHInput>
          <Button type="primary" danger htmlType="submit" loading={isLoading}>
            Login
          </Button>
        </PHForm>
      </div>
    </section>
  );
};

export default Login;
