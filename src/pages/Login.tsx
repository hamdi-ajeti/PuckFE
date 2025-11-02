import { useState } from "react"
import { Form, Input, Card, Button, message, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import { useNavigate} from 'react-router-dom';
import { useAppDispatch } from "../hooks/hooks";
import { setAuth } from "../store/slices/authSlice";
import { authAPI } from "../services/api";

const { Text, Title, Link } = Typography;

export function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (isLogin) {
                const response = await authAPI.login({
                    email: values.email,
                    password: values.password
                });
                dispatch(setAuth({ user: response.user, token: response.token }));
                message.success('Login successful');
                navigate('/editor');
            }
            else {
                const response = await authAPI.register({
                    username: values.username,
                    email: values.email,
                    password: values.password
                });
                dispatch(setAuth({ user: response.user, token: response.token }));
                message.success('Registration succesful.');
                navigate('/editor');
            }
        }
        catch (error: any) {
            message.error(error.response?.data?.error || 'An error occurred.');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
            {isLogin ? 'Login' : 'Register'}
          </Title>
          
          <Form onFinish={handleSubmit} layout="vertical">
            {!isLogin && (
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter your username' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Username" 
                  size="large"
                />
              </Form.Item>
            )}

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Email" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                block 
                loading={loading}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </Form.Item>
          </Form>

          <Text style={{ textAlign: 'center', display: 'block' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register' : 'Login'}
            </Link>
          </Text>
        </Space>
      </Card>
    </div>
    )
}