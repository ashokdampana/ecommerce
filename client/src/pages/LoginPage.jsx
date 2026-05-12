import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../stores/useAuthStore.js';
import api from '../services/api.js';

const loginSchema = Yup.object({
  email: Yup.string().trim().email('Invalid Email').required('Email Required'),
  password: Yup.string().required('Password Required'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(s => s.setAuth);

  const handleSubmit = async (values) => {
    try {
      const res = await api({ method: 'POST', url: '/api/auth/login', data: values });
      // Server returns: { success, message, user: { id, name, email, role, accessToken } }
      console.log('Login response:', res.data);
      const { id, name, email, role, accessToken } = res.data.user;
      console.log('Extracted user:', { id, name, email, role, accessToken });

      // setAuth updates both state AND localStorage
      setAuth({ 
        user: { id, name, email }, 
        accessToken, 
        role: role 
      });
      console.log("STORE AFTER LOGIN:", useAuthStore.getState());
      console.log('Auth set, navigating to /');
      navigate('/');
      console.log('After navigate call');
      
    } catch (error) {
      console.log('Login error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2>Login</h2>
        <Formik 
          initialValues={{ email: '', password: '' }} 
          validationSchema={loginSchema} 
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="space-y-4">
              <div>
                <label>Email</label>
                <Field 
                  name="email" 
                  type="email" 
                  className="form-input" 
                  placeholder="admin@example.com"
                  value={formik.values.email}
                />
                <ErrorMessage name="email" component="div" className="form-error" />
              </div>
              <div>
                <label>Password</label>
                <Field 
                  name="password" 
                  type="password" 
                  className="form-input" 
                  placeholder="password"
                  value={formik.values.password}
                />
                <ErrorMessage name="password" component="div" className="form-error" />
              </div>
              <button type="submit" className="btn-primary">Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}; 

export default LoginPage;
