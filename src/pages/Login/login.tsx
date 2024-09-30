import { FieldType } from '../../lib/types';
import { setAdmin } from '../../store/booleans';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { admins } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyledDiv, Styledh2 } from './login-styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let { t } = useTranslation()

  const handleAdmin = () => {
    dispatch(setAdmin('ADMIN'))
    localStorage.setItem('showToast', 'true');
    sessionStorage.setItem('userRole', 'ADMIN')
  }
  

  const onSubmit = ( values:FieldType ) => {
    let admin = admins.filter(
      item => item.login == values.login && item.password == values.password
    )
    if(admin.length > 0){
      handleAdmin()
      navigate('/')
    }else{
      toast.error(t("fail"), {
        theme: 'colored'
      });
    }
  }

  return (
    <StyledDiv>
        <Styledh2>Login</Styledh2>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 600}}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            autoComplete="off"
        >
            <Form.Item<FieldType>
              label="Login"
              name="login"
              rules={[{ required: true, message: 'Please input your login!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ background : '#4D44B5' }}>
              Submit
            </Button>
            </Form.Item>
        </Form>
        <ToastContainer
          theme='colored'
          pauseOnHover = {false}
          autoClose={3000}
        />
    </StyledDiv>
  )
}
