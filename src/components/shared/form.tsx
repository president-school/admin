import { X } from "lucide-react";

import axios from "../../service/axios";
import { setFromModal } from "../../store/booleans";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { ObjType } from "../../lib/types";
import { useState } from "react";
import { addData } from "../../store/employees-slice";
interface Props {
  type?: string;
  id?: number | undefined;
}
export const ModalForm = ({ type, id }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (dataInfo: ObjType) => {
    try {
      setLoading(true);
      if (type == "put") {
        await axios.patch(`/hodimlar/${id}`, dataInfo);
      } else {
        const { data } = await axios.post("/hodimlar", dataInfo);
        console.log(data);
        
        dispatch(addData(data));
        
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      dispatch(setFromModal());
    }
  };

  return (
    <div className="w-[600px]  bg-white rounded-xl p-4">
      <X
        className="cursor-pointer mb-4"
        onClick={() => dispatch(setFromModal())}
      />
      <label htmlFor="">Name</label>
      <Form autoComplete="off" onFinish={onSubmit}>
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <label htmlFor="">Surname</label>
        <Form.Item
          name={"surname"}
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input />
        </Form.Item>
        <label htmlFor="">Role</label>
        <Form.Item
          name={"role"}
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input />
        </Form.Item>
        <label htmlFor="">Photo url</label>
        <Form.Item
          name={"url"}
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
