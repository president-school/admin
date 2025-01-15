import { Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
interface Props {
  name: string;
  error: boolean;
  errorMessage: string;
  label: string;
  lang: string;
  inputType?: "input" | "textAria";
}
const LanguageForm = ({
  error,
  errorMessage,
  name,
  label,
  lang,
  inputType,
}: Props) => {
  return (
    <div>
      <label>{label}</label>
      <div className="flex gap-1"></div>
      <>
        <Form.Item
          name={name + `_uz`}
          style={{ display: lang == "uz" ? "block" : "none" }}
          rules={[
            {
              required: error,
              message: errorMessage,
            },
          ]}
        >
          {inputType === "textAria" ? <TextArea /> : <Input />}
        </Form.Item>
        <Form.Item
          name={`${name}_en`}
          style={{ display: lang == "en" ? "block" : "none" }}
          rules={[
            {
              required: error,
              message: errorMessage,
            },
          ]}
        >
          {inputType === "textAria" ? <TextArea /> : <Input />}
        </Form.Item>
        <Form.Item
          name={`${name}_de`}
          style={{ display: lang == "de" ? "block" : "none" }}
          rules={[
            {
              required: error,
              message: errorMessage,
            },
          ]}
        >
          {inputType === "textAria" ? <TextArea /> : <Input />}
        </Form.Item>
      </>
    </div>
  );
};

export default LanguageForm;
