import { setFromModal } from "../../store/booleans";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button, Form, Input, Select, Upload } from "antd";
import { ObjType } from "../../lib/types";
import { useState, useEffect, useRef } from "react";
import { addData } from "../../store/employees-slice";
import {
  addEmployee,
  editEmployee,
  getEmployeeById,
  uploadFile,
} from "../../firebase/services";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import MaskedInput from 'antd-mask-input'
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  id?: string | undefined | number;
}

export const ModalForm = ({ id }: Props) => {
  const dispatch = useDispatch();
  const method = useSelector((state: RootState) => state.booleans.method);
  const editId = useSelector((state: RootState) => state.booleans.edit);
  const arr = useSelector((state: RootState) => state.employees.employeesArr);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [employeeData, setEmployeeData] = useState<ObjType | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (id && editId !== undefined) {
      const fetchEmployee = async () => {
        try {
          setLoading(true);
          const data = await getEmployeeById(editId.toString());

          if (method == "put") {
            setEmployeeData(data);
            form.setFieldsValue(data);
          }
        } catch (error) {
          console.log("Error fetching employee data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }
  }, [id, form, editId]);
  const data = Date.now();

  const onSubmit = async (dataInfo: ObjType) => {
    try {
      setLoading(true);

      let photoURL = dataInfo.photo || "";

      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        photoURL = await uploadFile(file);
      }

      const updatedEmployeeData = {
        ...dataInfo,
        photo: photoURL,
        isTeacher: dataInfo.role.toLowerCase() == "teacher" ? true : false,
        newDate: data,
      };

      if (!id || id === "0") {
        await addEmployee(updatedEmployeeData)
          .then((data) => {
            toast.success(t("toast.post_success"));
            dispatch(setFromModal());
            return data;
          })
          .then((data) => {
            dispatch(addData({
              ...data, imgURL: ""
            }));
          })
          .catch(() => {
            toast.error(t("toast.post_err"));
          });
      } else {
        await editEmployee(id.toString(), updatedEmployeeData)
          .then(() => {
            toast.success(t("toast.edit_success"));
            dispatch(setFromModal());
          })

          .catch(() => {
            toast.error(t("toast.post_err"));
          });
      }
    } catch (error) {
      console.log("Error during submission:", error);
      toast.error("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  const handleFileChange = ({ fileList }: { fileList: any[] }) => {
    setFileList(fileList || []);
  };
  const wrapper = useRef<HTMLDivElement | null>(null);

  const handleClose = (e : React.MouseEvent<HTMLDivElement>) => {
    const target = e.target
    e.stopPropagation()
    if(target == wrapper.current){
      setIsVisible(false);
      setTimeout(() => {
        dispatch(setFromModal())
      }, 300);
    }
  }


  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 z-10 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-[600px] h-auto max-h-[80vh] overflow-y-auto bg-white p-4 transform transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-10"
        }`}
      >
        <div className="w-full flex justify-end">
          <div onClick={handleClose} ref={wrapper} className="w-max cursor-pointer">
            <CloseIcon className="pointer-events-none text-4xl"/>
          </div>
        </div>
        <Form
          form={form}
          autoComplete="off"
          onFinish={onSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <label htmlFor="">{t("form.full_name")}</label>
          <Form.Item
            initialValue={employeeData?.full_name}
            name={"full_name"}
            rules={[{ required: true, message: t("form.validation.name") }]}
          >
            <Input />
          </Form.Item>

          <label htmlFor="">{t("form.desc")}</label>
          <Form.Item
            initialValue={employeeData?.description}
            name={"description"}
            rules={[{ required: true, message: t("form.validation.desc") }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <label htmlFor="">{t("form.education")}</label>
          <Form.Item
            initialValue={employeeData?.education}
            name={"education"}
            rules={[
              { required: true, message: t("form.validation.education") },
            ]}
          >
            <Input />
          </Form.Item>

          <label htmlFor="">{t("form.scientific_degree")}</label>
          <Form.Item
            initialValue={employeeData?.scientific_degree}
            name={"scientific_degree"}
            rules={[{ required: true, message: t("form.validation.degree") }]}
          >
            <Input />
          </Form.Item>

          <label htmlFor="">{t("form.role")}</label>
          <Form.Item
            name={"role"}
            rules={[{ required: true, message: t("form.validation.role") }]}
            initialValue={employeeData?.role}
          >
            <Select placeholder="Select your role">
              <Select.Option value={"Teacher"}>
                {t("form.teacher")}
              </Select.Option>
              <Select.Option value={"Worker"}>{t("form.worker")}</Select.Option>
            </Select>
          </Form.Item>
          <label htmlFor="">{t("form.position")}</label>
          <Form.Item
            name={"position"}
            rules={[{ required: true, message: t("form.validation.role") }]}
            initialValue={employeeData?.role}
          >
            <Input />
          </Form.Item>

          <label htmlFor="">{t("form.phone")}</label>
          <Form.Item
            initialValue={employeeData?.phone}
            name={"phone"}
            rules={
              [
                { 
                  required: true,
                  message: t("form.validation.phone") 
                }
              ]
            }
          >
            <MaskedInput
              mask="+998(00)000-00-00"
              placeholder="+999(99)999-99-99"
            />
          </Form.Item>

          <label htmlFor="">{t("form.email")}</label>
          <Form.Item
            initialValue={employeeData?.email}
            name={"email"}
            rules={[
              { required: true, message: t("form.validation.email") },
              { type: "email", message: t("form.validation.email2") },
            ]}
          >
            <Input />
          </Form.Item>

          <label htmlFor="">{t("form.admission_days")}</label>
          <Form.Item
            initialValue={employeeData?.admission_days}
            name={"admission_days"}
            rules={[{ required: true, message: t("form.validation.days") }]}
          >
            <Input />
          </Form.Item>

          <label htmlFor="">{t("form.number")}</label>
          <Form.Item
            initialValue={employeeData?.number}
            name={"number"}
            rules={[{ required: true , message: `${t("form.validation.edge")}${arr.length + 1}` }]}
          >
            <Input/>
          </Form.Item>

          <label htmlFor="photo">{t("form.photo")}</label>
          <Form.Item
            name="photo"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              { required: id === "0", message: t("form.validation.photo") },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Select Photo</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
