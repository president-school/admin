import { Button, Form, Input } from 'antd';
import { createOrUpdateText } from '../firebase/services';
export const Acceptance = () => {
  const onSubmit = async (data: string) => {
    await createOrUpdateText(data);
  };
  return (
    <main className="w-full p-10">
      <Form
        layout="vertical"
        onFinish={(values) => {
          onSubmit(values);
        }}>
        <Form.Item
          name={'description'}
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input.TextArea placeholder="Enter your description here" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};
