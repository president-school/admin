import { X } from 'lucide-react';
import { setFromModal } from '../../store/booleans';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Button, Form, Input, Select, Upload, Checkbox } from 'antd';
import { ObjType } from '../../lib/types';
import { useState, useEffect } from 'react';
import { addData } from '../../store/employees-slice';
import { addEmployee, editEmployee, getEmployeeById, uploadFile } from '../../firebase/services';
import { UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  id?: string | undefined | number;
}

export const ModalForm = ({ id }: Props) => {
  const dispatch = useDispatch();
  const editId = useSelector((state: RootState) => state.booleans.edit);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [employeeData, setEmployeeData] = useState<ObjType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id && editId !== undefined) {
      const fetchEmployee = async () => {
        try {
          setLoading(true);
          const data = await getEmployeeById(editId.toString());
          if (data) {
            setEmployeeData(data);
            form.setFieldsValue(data);
          }
        } catch (error) {
          console.log('Error fetching employee data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }
  }, [id, form, editId]);

  const onSubmit = async (dataInfo: ObjType) => {
    try {
      setLoading(true);

      let photoURL = dataInfo.photo || '';

      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        photoURL = await uploadFile(file);
      }

      const updatedEmployeeData = {
        ...dataInfo,
        photo: photoURL,
        isTeacher: dataInfo.isTeacher !== undefined ? dataInfo.isTeacher : false,
      };

      if (!id || id === '0') {
        await addEmployee(updatedEmployeeData)
          .then((data) => {
            toast.success('Muvaffaqiyatli qo`shildi');
            return data;
          })
          .then((data) => {
            dispatch(addData({ ...data, imgURL: '' }));
          })
          .catch(() => {
            toast.error('Xatolik yuz berdi');
          });
      } else {
        await editEmployee(id.toString(), updatedEmployeeData)
          .then(() => {
            toast.success('Muvaffaqiyatli o`zgartirildi');
          })
          .catch(() => {
            toast.error('Xatolik yuz berdi');
          });
      }
    } catch (error) {
      console.log('Error during submission:', error);
      toast.error('Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ fileList }: any) => setFileList(fileList || []);

  return (
    <div className="w-[600px] h-auto max-h-[80vh] overflow-y-auto bg-white rounded-xl p-4">
      <X className="cursor-pointer mb-4" onClick={() => dispatch(setFromModal())} />
      <Form form={form} autoComplete="off" onFinish={onSubmit}>
        <label htmlFor="">Full Name</label>
        <Form.Item
          initialValue={employeeData?.full_name}
          name={'full_name'}
          rules={[{ required: true, message: 'Please input your full name!' }]}>
          <Input />
        </Form.Item>

        <label htmlFor="">Description</label>
        <Form.Item
          initialValue={employeeData?.description}
          name={'description'}
          rules={[{ required: true, message: 'Please input a description!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <label htmlFor="">Education</label>
        <Form.Item
          initialValue={employeeData?.education}
          name={'education'}
          rules={[{ required: true, message: 'Please input your education!' }]}>
          <Input />
        </Form.Item>

        <label htmlFor="">Scientific Degree</label>
        <Form.Item
          initialValue={employeeData?.scientific_degree}
          name={'scientific_degree'}
          rules={[{ required: true, message: 'Please input your scientific degree!' }]}>
          <Input />
        </Form.Item>

        <label htmlFor="">Role</label>
        <Form.Item
          name={'role'}
          rules={[{ required: true, message: 'Please select your role!' }]}
          initialValue={employeeData?.role}>
          <Select placeholder="Select your role">
            <Select.Option value={'Teacher'}>Teacher</Select.Option>
            <Select.Option value={'Worker'}>Worker</Select.Option>
          </Select>
        </Form.Item>

        <label htmlFor="">Is Teacher</label>
        <Form.Item
          name={'isTeacher'}
          valuePropName="checked"
          initialValue={employeeData?.isTeacher}>
          <Checkbox>Is Teacher</Checkbox>
        </Form.Item>

        <label htmlFor="">Phone</label>
        <Form.Item
          initialValue={employeeData?.phone}
          name={'phone'}
          rules={[{ required: true, message: 'Please input your phone number!' }]}>
          <Input />
        </Form.Item>

        <label htmlFor="">Email</label>
        <Form.Item
          initialValue={employeeData?.email}
          name={'email'}
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not a valid email!' },
          ]}>
          <Input />
        </Form.Item>

        <label htmlFor="">Admission Days</label>
        <Form.Item
          initialValue={employeeData?.admission_days}
          name={'admission_days'}
          rules={[{ required: true, message: 'Please input the admission days!' }]}>
          <Input />
        </Form.Item>

        <label htmlFor="photo">Photo</label>
        <Form.Item
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => (e && e.fileList) || []}
          rules={[{ required: id === '0', message: 'Please select a photo!' }]}>
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}>
            <Button icon={<UploadOutlined />}>Select Photo</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
