import { FieldType } from "../utils/types";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input, message } from "antd";
import { ToastContainer } from "react-toastify";

import { login } from "../firebase/auth";
import { useState } from "react";
export const Login = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: FieldType) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      message.error("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[600px] p-10 border bg-white shadow-xl flex flex-col items-center">
        <h2 className="mb-5 text-3xl font-semibold">Login</h2>
        <Form onFinish={onSubmit}>
          <label className="mb-1 block">Email</label>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your login!" },
              { type: "email", message: "invalid email" },
            ]}
            className=" w-[500px] mb-5"
          >
            <Input />
          </Form.Item>

          <label className="mb-1 block">Password</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className=" mb-5"
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full my-5"
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </div>
      <ToastContainer theme="colored" pauseOnHover={false} autoClose={3000} />
    </div>
  );
};
