import { Button, Form, Input } from "antd";
import { createOrUpdateText } from "../firebase/services";
import { useTranslation } from "react-i18next";
export const Acceptance = () => {
  const { t } = useTranslation();
  const onSubmit = async (data: string) => {
    await createOrUpdateText(data);
  };
  return (
    <main className="w-full p-10">
      <Form
        layout="vertical"
        onFinish={(values) => {
          onSubmit(values);
        }}
      >
        <Form.Item
          name={"description"}
          label={t("acceptance.desc")}
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea placeholder={t("acceptance.input")} rows={4} />
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
