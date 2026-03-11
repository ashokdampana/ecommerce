import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useTanMutation from '../hooks/useTanMutation.js';
import useAuthContext from '../context/AuthContext.jsx';

const registerSchema = Yup.object().shape({
  name: Yup.string().trim().min(6, 'Name must be at least 6 characters').required('Name Required'),
  email: Yup.string().trim().email('Invalid Email').required('Email Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password Required'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  
  const { mutate, isPending, isError, error } = useTanMutation('POST', '/api/auth/register', ['register']);

  const handleSubmit = (values) => {
    mutate({ body: values }, 
      { onSuccess: (data) => {
        // automatically sign in the new user
        if (data?.user && data?.token) {
          login(data.user, data.token);
          navigate('/');
        } else {
          navigate('/login');
        }
      }}
    );
  };

  if (isPending) return <div className="page-center">Creating account...</div>;

  return (
    <div className="page-center">
      <div className="form-card">
        <h2>Register</h2>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label>Name</label>
                <Field name="name" type="text" className="form-input" placeholder="John Doe" />
                <ErrorMessage name="name" component="div" className="form-error" /> 
              </div>

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

              {isError && (
                <div className="form-error-box">
                  {error?.response?.data?.message || "Registration failed. Please try again."}
                </div>
              )}

              <button type="submit" disabled={isPending} className="btn-primary">
                {isPending ? 'Registering...' : 'Register'}
              </button>
              
              <p className="text-center text-sm mt-4">
                Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;