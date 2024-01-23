import { useAuthContext } from "../../context/AuthProvider";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./SignIn.scss";

function SignIn() {
  const { currentUser, isAuthenticated, login } = useAuthContext();

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.info("onSubmit", values);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Authentication successful
        const data = await response.json();
        console.warn("Login successful:", data);
        const { jwtToken, userData } = data;
        login(jwtToken, userData);
        navigate("/");
      } else {
        // Authentication failed
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
    password: Yup.string().required("Password is required"),
  });

  console.log(currentUser);

  return (
    <div className="signIn-container">
      <h1 className="signIn-form-title">SignIn</h1>
      <div className="signIn-form">
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
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
