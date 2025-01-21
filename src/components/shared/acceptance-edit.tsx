import { Button, Form, message } from "antd";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { createOrUpdateText, GetFirebaseData } from "../../firebase/services";

import { toast } from "react-toastify";
import { AcceptanceModal } from "../../utils/dispatch";

import { useEffect, useState } from "react";

export const AcceptanceEdit = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState<"uz" | "de" | "en">("uz");

  const stripHTML = (htmlString: any) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const [form] = Form.useForm();
  const [validateErr, setValidateErr] = useState([""]);
  const onChangeLang = (lang: "uz" | "en" | "de") => {
    setActiveLang(lang);
  };

  const { data } = GetFirebaseData<any[]>("text");
  const formInitialValue = {
    description_de: stripHTML(data[0]?.text?.de?.text),
    description_en: stripHTML(data[0]?.text?.en?.text),
    description_uz: stripHTML(data[0]?.text?.uz.text),
  };
  useEffect(() => {
    form.setFieldsValue(formInitialValue);
  }, [data, form]);

  const errorClick = (data: any) => {
    setValidateErr([""]);
    const errors: Record<string, string> = {};
    data.errorFields?.forEach((field: any) => {
      errors[field.name[0]] = field.errors[0]; // Maydon nomi va xato xabarini olish
    });

    for (const [field] of Object.entries(errors)) {
      setValidateErr((item) => [...item, field.slice(field.length - 2)]);
    }
  };
  useEffect(() => {
    if (validateErr.length > 1) message.error(t("toast.form_err"));
  }, [validateErr]);
  interface OnSubmit {
    description_de: string;
    description_en: string;
    description_uz: string;
  }
  const onSubmit = async (values: OnSubmit) => {
    console.log(values);

    try {
      setLoading(true);
      await createOrUpdateText(
        values.description_de,
        values.description_en,
        values.description_uz
      );
      toast.success(t("toast.textAria_success"));
      AcceptanceModal({ text: "", open: false, refresh: true });
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };
  return (
    <div className="fixed w-full h-screen left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="w-[70vw] min-h-[20vh] bg-white rounded-md p-5">
        <div className="flex justify-between items-center mb-5">
          <p className="font-semibold text-3xl"> {t("news.modal_edit")}</p>
          <X
            size={30}
            className="cursor-pointer"
            onClick={() =>
              AcceptanceModal({
                text: "",
                open: false,
                refresh: false,
              })
            }
          />
        </div>
        <div className="w-full flex gap-2 mb-5">
          {["uz", "de", "en"].map((lang) => (
            <Button
              key={lang}
              // type={activeLang === lang ? "primary" : "default"}
              onClick={() => onChangeLang(lang as "uz" | "de" | "en")}
              className={`w-full ${
                validateErr.includes(lang) && activeLang !== lang
                  ? "bg-red-500 text-white"
                  : ""
              } ${activeLang === lang ? "bg-blue-500 text-white" : ""}  `}
            >
              {t(`form.${lang}`)}
            </Button>
          ))}
        </div>
        <Form onFinish={onSubmit} form={form} onFinishFailed={errorClick}>
          <Form.Item
            name={"description_de"}
            className=" min-h-[300px] mb-10"
            style={{ display: activeLang == "de" ? "block" : "none" }}
            rules={[
              {
                required: true,
                message: t("form.validation.desc"),
              },
            ]}
          >
            <textarea className="h-[300px] w-full max-h-[700px] bg-[#f9f9f9] rounded-md p-3 focus:border-hidden outline-none" />
          </Form.Item>
          <Form.Item
            name={"description_uz"}
            className=" min-h-[300px] mb-10"
            style={{ display: activeLang == "uz" ? "block" : "none" }}
            rules={[
              {
                required: true,
                message: t("form.validation.desc"),
              },
            ]}
          >
            <textarea className="h-[300px] w-full max-h-[700px] bg-[#f9f9f9] rounded-md p-3 focus:border-hidden outline-none" />
          </Form.Item>
          <Form.Item
            name={"description_en"}
            className=" min-h-[300px] mb-10"
            style={{ display: activeLang == "en" ? "block" : "none" }}
            rules={[
              {
                required: true,
                message: t("form.validation.desc"),
              },
            ]}
          >
            <textarea className="h-[300px] w-full max-h-[700px] bg-[#f9f9f9] rounded-md p-3 focus:border-hidden outline-none" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            {t("acceptance.submit")}
          </Button>
        </Form>
      </div>
    </div>
  );
};
