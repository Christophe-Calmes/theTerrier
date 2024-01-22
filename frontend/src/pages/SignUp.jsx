import styles from './styles/signup.module.css';
import signupIMG from '../assets/images/signup.png'

import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };
  const onSubmit = async (values) => {
    const objet = {}

    console.log("onSubmit", values);

    objet.email = values.email
    objet.username = values.username
    objet.city = values.city
    objet.birthday_date = values.birthday_date
    objet.gender = values.gender
    objet.password = values.password
    objet.role_id = 1
    objet.valid = 1

    console.log(objet)

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objet),
      });
  
      if (!response.ok) {
        // Handle the error here, e.g., show an error message to the user
        console.error("Error:", response.statusText);
        return;
      }
  
      // Assuming the backend returns a JSON response, you can parse it
      const responseData = await response.json();
      console.log("Success:", responseData);
    } catch (error) {
      // Handle any fetch-related errors here
      console.error("Fetch error:", error);
    }

  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
  });
  return (
    <div className={styles.signup_container}>
        <div className={styles.left_part}>
        <h1 className={styles.title}>Register</h1>
        <div className={styles.form_container}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form>
                {/* email */}
                <div className="field">
                  <Field name="email" placeholder="Email" />
                  <div className="error">
                    <ErrorMessage name="email" component="span" />
                  </div>
                </div>
                {/* username */}
                <div className="field">
                  <Field name="username" placeholder="Username" />
                  <div className="error">
                    <ErrorMessage name="username" component="span" />
                  </div>
                </div>
                {/* city */}
                <div className="field">
                  <Field name="city" placeholder="City" />
                  <div className="error">
                    <ErrorMessage name="city" component="span" />
                  </div>
                </div>
                {/* birthdate */}
                <div className="field">
                  <Field name="birthday_date" placeholder="Date of birth" />
                  <div className="error">
                    <ErrorMessage name="birthday_date" component="span" />
                  </div>
                </div>
                {/* gender */}
                <div className="field">
                  {/* <Field name="gender" placeholder="Gender" /> */}
                    <Field as="select" name="gender">
                      <option value="0">Choose a gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </Field>
                  <div className="error">
                    <ErrorMessage name="gender" component="span" />
                  </div>
                </div>
                {/* password */}
                <div className="field">
                  <Field name="password" placeholder="Password" type="password" />
                  <div className="error">
                    <ErrorMessage name="password" component="span" />
                  </div>
                </div>
                {/* confirm password */}
                <div className="field">
                  <Field name="password2" placeholder="Confirm Password" type="password" />
                  <div className="error">
                    <ErrorMessage name="password2" component="span" />
                  </div>
                </div>

                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>   
      <div className={styles.right_part}>
          <div className={styles.wrapper_image}>
            <img src={signupIMG} className={styles.image_right} alt="image signup" />
          </div>
      </div>
    </div>
  );
};

export default SignUp;