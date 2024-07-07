/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IUser } from "../redux/interface/authTypes";

interface ILoginFormInputs {
  userId: string;
  password: string;
}

const defaultValues: ILoginFormInputs = {
  userId: "A-0001",
  password: "Admin01@",
};

const Login: React.FC = () => {
  const [loginF] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ILoginFormInputs>({
    defaultValues,
  });

  const onSubmit = async (formData: FieldValues) => {
    const userId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: formData.userId,
        password: formData.password,
      };

      const res = await loginF(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as IUser;

      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      navigate(`/${user.role}/dashboard`);
    } catch (error: any) {
      toast.error(error.message || "Some thing went wrong", {
        id: userId,
        duration: 2000,
      });
    }

    toast.success("Successfully logged in", { id: userId, duration: 2000 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="userId">ID:</label>
      <input
        type="text"
        id="userId"
        {...register("userId", { required: true })}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        id="password"
        {...register("password", { required: true })}
      />
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
