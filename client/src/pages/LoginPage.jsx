import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../stores/useAuthStore.js';
import useTanMutation from '../hooks/useTanMutation.js';

const loginSchema = Yup.object({
  email: Yup.string().trim().email('Invalid Email').required('Email Required'),
  password: Yup.string().required('Password Required'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { mutate, isPending, isError, error } = useTanMutation('POST', '/api/auth/login', ['user']);

  const handleSubmit = (values) =>
    mutate({ body: values }, {
      onSuccess: (data) => {
        console.log('login page mutate success data ', data)
        login(data?.user);
        navigate('/');
      },
    });

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="page-center">
      <div className="form-card">
        <h2>Login</h2>
        <Formik initialValues={{ email: '', password: '' }} validationSchema={loginSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label>Email</label>
                <Field name="email" type="email" className="form-input" placeholder="admin@example.com" />
                <ErrorMessage name="email" component="div" className="form-error" />
              </div>
              <div>
                <label>Password</label>
                <Field name="password" type="password" className="form-input" placeholder="••••••••" />
                <ErrorMessage name="password" component="div" className="form-error" />
              </div>
              {isError && <div className="form-error">{error?.response?.data?.message || 'Login failed'}</div>}
              <button type="submit" disabled={isPending || isSubmitting} className="btn-primary">Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
