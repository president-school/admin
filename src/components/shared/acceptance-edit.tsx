import { Button, Form } from "antd";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { createOrUpdateText, } from "../../firebase/services";

import { toast } from "react-toastify";
import { AcceptanceModal } from "../../utils/dispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

export const AcceptanceEdit = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const acceptanceData = useSelector(
    (state: RootState) => state.booleans.acceptanceModal
  );

  const stripHTML = (htmlString: any) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  const plainText = stripHTML(acceptanceData.text);
  console.log(plainText);

  const [form] = Form.useForm();

  const onSubmit = async (values: { description: string }) => {
    try {
      setLoading(true);
      await createOrUpdateText(values.description);
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
        <Form onFinish={onSubmit} form={form}>
          <Form.Item
            name={"description"}
            className=" min-h-[300px] mb-10"
            initialValue={stripHTML(acceptanceData.text)}
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
