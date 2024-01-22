import { useAuthContext } from "../../context/AuthProvider";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "./SignIn.scss";

function SignIn() {
  const { user, isAuthenticated, login, logout } = useAuthContext();
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    console.info("onSubmit", values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
    password: Yup.string().required("Password is required"),
  });

  console.log(user);

  return (
    <div className="signIn-container">
      <h1 className="signIn-form-title">SignIn</h1>
      <div className="signIn-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <div className="field">
                <Field name="email" placeholder="Email" />
                <div className="error">
                  <ErrorMessage name="email" component="span" />
                </div>
              </div>

              <div className="field">
                <Field name="password" placeholder="Password" />
                <div className="error">
                  <ErrorMessage name="password" component="span" />
                </div>
              </div>

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignIn;
