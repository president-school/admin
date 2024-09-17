import { Button, Form } from "antd";
import { createOrUpdateText } from "../firebase/services";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";

export const Acceptance = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onSubmit = async (values: { description: string }) => {
    try {
      setLoading(true);
      await createOrUpdateText(values.description);
      toast.success(t("toast.textAria_success"));
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <main className="w-full p-10">
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="description"
          label={t("acceptance.desc")}
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea placeholder={t("acceptance.input")} rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};
