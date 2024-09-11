import { X } from 'lucide-react';
import { setFromModal } from '../../store/booleans';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Select } from 'antd';
import { ObjType } from '../../lib/types';
import { useState } from 'react';
import { addData } from '../../store/employees-slice';
import { addEmployee, editEmployee } from '../../firebase/services';
import { v4 as uuid } from 'uuid';
interface Props {
  type?: string | undefined;
  id?: number | undefined;
}
export const ModalForm = ({ type, id }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (dataInfo: ObjType) => {
    console.log(dataInfo);

    try {
      setLoading(true);
      if (id === 0) {
        const data = await addEmployee(dataInfo).then((data) => data);
        dispatch(addData(data));
      } else {
        await editEmployee(id, { ...dataInfo }).then((data) => data);
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
      <X className="cursor-pointer mb-4" onClick={() => dispatch(setFromModal())} />
      <label htmlFor="">Name</label>
      <Form autoComplete="off" onFinish={onSubmit}>
        <Form.Item name={'name'} rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>
        <label htmlFor="">Surname</label>
        <Form.Item
          name={'surname'}
          rules={[{ required: true, message: 'Please input your surname!' }]}>
          <Input />
        </Form.Item>
        <label htmlFor="">Role</label>
        <Form.Item name={'role'} rules={[{ required: true, message: 'Please select your role!' }]}>
          <Select placeholder="Select your role">
            <Select.Option value="teacher">Teacher</Select.Option>
            <Select.Option value="worker">Worker</Select.Option>
          </Select>
        </Form.Item>
        <label htmlFor="">Photo url</label>
        <Form.Item name={'url'} rules={[{ required: true, message: 'Please input your surname!' }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
