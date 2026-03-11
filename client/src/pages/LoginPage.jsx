
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthContext from '../context/AuthContext.jsx';
import useTanMutation from '../hooks/useTanMutation.js';

const loginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid Email').required('Email Required'),
  password: Yup.string().required('Password Required'),
});


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const { mutate, isPending, isError, error } = useTanMutation('POST', '/api/auth/login', ['login']);

  const handleSubmit = (values) => {
	mutate({ body: values }, 
		{ onSuccess: (data) => {
			login(data.user, data.token); 
			navigate('/');
		}}
	);
  };

  if (isPending) <div>Loading...</div>  


  return (
    <div className="page-center">
      <div className="form-card">
        <h2>Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
		{() => (
			<Form className="space-y-4">
				<div>
				<label>Email</label>
				<Field
					name="email"
					type="email"
					className="form-input"
					placeholder="admin@example.com"
				/>
				<ErrorMessage name="email" component="div" className="form-error" />
				</div>

				<div>
				<label>Password</label>
				<Field
					name="password"
					type="password"
					className="form-input"
					placeholder="••••••••"
				/>
				<ErrorMessage name="password" component="div" className="form-error" />
				</div>

				{isError && (
					<div className="form-error">
						{error?.response?.data?.message || "Login failed. Please try again."}
					</div>
				)}

				<button type="submit" disabled={isPending} className="btn-primary"
				>Login</button>
			</Form>
		)}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;