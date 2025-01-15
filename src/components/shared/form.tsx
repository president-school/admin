import { Button, Form, Input, message, Select, Upload } from "antd";
import { AddEmployeeFormData } from "../../utils/types";
import { useState, useEffect } from "react";

import { UploadOutlined } from "@ant-design/icons";

import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import {
  GetFirebaseDataById,
  PostFirebaseData,
  UpdateData,
  uploadFile,
} from "../../firebase/services";
import LanguageForm from "../ui/index,";
import { setFormModalFun } from "../../utils/dispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { filterFormValue } from "../../utils/mapdata";
import InputMask from "react-input-mask";
import { X } from "lucide-react";
export const ModalForm = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const [form] = Form.useForm();
  const { t } = useTranslation();
  const data = Date.now();

  const formModal = useSelector((state: RootState) => state.booleans.fromModal);
  const { data: formData } = GetFirebaseDataById("employees", formModal.id);

  const {
    loading: updateLoading,
    success,
    fetchData,
  } = UpdateData("employees");
  const formInitialValue = filterFormValue(formData);
  const {
    loading,
    fetchingData,
    success: addSuccess,
  } = PostFirebaseData("employees");
  const [activeLang, setActiveLang] = useState<"uz" | "ru" | "en">("uz");
  const [photos, setPhotos] = useState<string>(formData?.uz?.photo);

  useEffect(() => {
    if (formModal.role === "edit") {
      form.setFieldsValue(formInitialValue);
      setPhotos(formData?.uz?.photo);
    }
  }, [formData, form]);

  if (success) {
    setFormModalFun({
      open: false,
      role: "add",
      id: "",
      refresh: true,
      title: "",
    });
  }
  if (addSuccess) {
    setFormModalFun({
      open: false,
      role: "add",
      id: "",
      refresh: true,
      title: "",
    });
  }
  const [imgLoading, setImgLoading] = useState(false);
  const onSubmit = async (dataInfo: AddEmployeeFormData) => {
    let photoURL = photos ? photos[0] : "";

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setImgLoading(true);
      photoURL = await uploadFile(file);
      setImgLoading(false);
    }
    const filterData = {
      uz: {
        full_name: dataInfo.full_name_uz,
        description: dataInfo.description_uz,
        email: dataInfo.email,
        phone: dataInfo.phone,
        education: dataInfo.education_uz,
        education_level: dataInfo.education_level_uz,
        isTeacher: dataInfo.role === "Teacher",
        photo: photoURL,
        position: dataInfo.position_uz,
        role: dataInfo.role,
        scientific_degree: dataInfo.scientific_degree_uz,
        admission_days: dataInfo.admission_days_uz,
        newDate: data,
      },
      de: {
        full_name: dataInfo.full_name_de,
        description: dataInfo.description_de,
        email: dataInfo.email,
        phone: dataInfo.phone,
        education: dataInfo.education_de,
        education_level: dataInfo.education_level_de,
        isTeacher: dataInfo.role === "teacher",
        photo: photoURL,
        position: dataInfo.position_de,
        role: dataInfo.role,
        scientific_degree: dataInfo.scientific_degree_de,
        admission_days: dataInfo.admission_days_de,
        newDate: data,
      },
      en: {
        full_name: dataInfo.full_name_en,
        description: dataInfo.description_en,
        email: dataInfo.email,
        phone: dataInfo.phone,
        education: dataInfo.education_en,
        education_level: dataInfo.education_level_en,
        isTeacher: dataInfo.role === "teacher",
        photo: photoURL,
        position: dataInfo.position_en,
        role: dataInfo.role,
        scientific_degree: dataInfo.scientific_degree_en,
        admission_days: dataInfo.admission_days_en,
        newDate: data,
      },
    };
    if (formModal.role === "add") {
      fetchingData(filterData);
    } else {
      fetchData(formModal.id, filterData);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 4);
  }, []);

  const handleFileChange = ({ fileList }: { fileList: any[] }) => {
    setFileList(fileList || []);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setFormModalFun({
        role: "add",
        id: "",
        open: false,
        refresh: false,
        title: "",
      });
    }, 300);
  };

  const onChangeLang = (lang: "uz" | "en" | "ru") => {
    setActiveLang(lang);
  };
  const [validateErr, setValidateErr] = useState([""]);

  useEffect(() => {
    if (validateErr.length > 1) message.error(t("toast.form_err"));
  }, [validateErr]);

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
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-100 z-10 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-[650px] h-auto max-h-[80vh] overflow-y-auto bg-white p-4 transform transition-transform duration-100 rounded-lg ${
          isVisible ? "translate-y-0" : "-translate-y-10"
        }`}
      >
        <Form
          form={form}
          autoComplete="off"
          onFinish={onSubmit}
          onClick={(e) => e.stopPropagation()}
          onFinishFailed={errorClick}
        >
          <div className="flex justify-between items-center mb-10 h-10 ">
            <p className="font-semibold text-2xl">{formModal.title}</p>
            <X size={30} className="cursor-pointer" onClick={handleClose} />
          </div>
          <div className="w-full flex gap-2 mb-5">
            {["uz", "de", "en"].map((lang) => (
              <Button
                key={lang}
                type={activeLang === lang ? "primary" : "default"}
                onClick={() => onChangeLang(lang as "uz" | "ru" | "en")}
                className={`w-full ${
                  validateErr.includes(lang) ? "bg-red-500" : ""
                } ${activeLang === lang ? "bg-blue-500" : ""} `}
              >
                {t(`form.${lang}`)}
              </Button>
            ))}
          </div>
          <LanguageForm
            name="full_name"
            label={t("form.full_name")}
            error={true}
            errorMessage={t("form.validation.name")}
            lang={activeLang}
          />
          <LanguageForm
            name="description"
            label={t("form.desc")}
            error={true}
            errorMessage={t("form.validation.desc")}
            lang={activeLang}
          />
          <LanguageForm
            name="education"
            label={t("form.education")}
            error={true}
            errorMessage={t("form.validation.education")}
            lang={activeLang}
          />
          <LanguageForm
            name="education_level"
            label={t("form.education_level")}
            error={true}
            errorMessage={t("form.validation.education")}
            lang={activeLang}
          />
          <LanguageForm
            name="scientific_degree"
            label={t("form.scientific_degree")}
            error={true}
            errorMessage={t("form.validation.degree")}
            lang={activeLang}
          />

          <label htmlFor="">{t("form.role")}</label>
          <Form.Item
            name={"role"}
            rules={[{ required: true, message: t("form.validation.role") }]}
            // initialValue={employeeData?.role}
          >
            <Select placeholder="Select your role">
              <Select.Option value={"Teacher"}>
                {t("form.teacher")}
              </Select.Option>
              <Select.Option value={"Worker"}>{t("form.worker")}</Select.Option>
            </Select>
          </Form.Item>
          <LanguageForm
            name="position"
            label={t("form.position")}
            error={true}
            errorMessage={t("form.validation.role")}
            lang={activeLang}
          />

          <LanguageForm
            name="admission_days"
            label={t("form.admission_days")}
            error={true}
            errorMessage={t("form.validation.days")}
            lang={activeLang}
          />
          <label htmlFor="">{t("form.phone")}</label>
          <Form.Item
            name={"phone"}
            rules={[
              {
                validator: (_, value) => {
                  const cleanedValue = value?.replace(/[^\d]/g, ""); // Faqat raqamlar
                  const uzbPhonePattern = /^998\d{9}$/; // 998XXXXXXXXX formati
                  if (!cleanedValue || !uzbPhonePattern.test(cleanedValue)) {
                    return Promise.reject(t("form.validation.phone_err"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputMask
              mask="+998 (99) 999-99-99"
              placeholder="+998 (__) ___-__-__"
              maskChar=""
            >
              {(inputProps: any) => <Input {...inputProps} type="tel" />}
            </InputMask>
          </Form.Item>

          <label htmlFor="">{t("form.email")}</label>
          <Form.Item
            name={"email"}
            rules={[
              { required: true, message: t("form.validation.email") },
              { type: "email", message: t("form.validation.email2") },
            ]}
          >
            <Input />
          </Form.Item>

          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}
            disabled={fileList.length > 0}
          >
            <Button
              icon={<UploadOutlined />}
              className="w-[620px]"
              disabled={fileList.length > 0}
            >
              {t("form.photo")}
            </Button>
          </Upload>
          {formModal.role == "edit" && (
            <div className="flex my-2 gap-2 flex-wrap">
              <div className="relative">
                <img src={photos} alt="" className="w-[100px]" />
                {photos?.length > 0 && (
                  <span
                    className="w-5 h-5 bg-red-500 rounded-full absolute top-2 right-2 flex justify-center items-center text-white cursor-pointer"
                    onClick={() => setPhotos("")}
                  >
                    X
                  </span>
                )}
              </div>
            </div>
          )}

          <Button
            type="primary"
            htmlType="submit"
            loading={loading || updateLoading || imgLoading}
            onClick={errorClick}
            className="w-full mt-5"
          >
            {t("submit")}
          </Button>
        </Form>
      </div>
    </div>
  );
};
