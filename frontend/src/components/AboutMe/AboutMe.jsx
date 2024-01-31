import styles from "../../pages/styles/profile.module.css";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import Modal from "react-modal";
const modalFormStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      with: "50vw",
    },
  };
function AboutMe({ user }) {
    const [isAboutMe, setIsAboutMe] = useState(false);
    const openAboutMe = () => {
        setIsAboutMe(true);
      };
      const closeAboutMe = () => {
        setIsAboutMe(false);
      };

  const Submit = (values) => {
    console.info(values);
  };

  return (
    <div>
          <button className={styles.buttonApplication} onClick={openAboutMe}>
              About me
            </button>
            {isAboutMe && (
              <Modal
                isOpen={isAboutMe}
                onRequestClose={closeAboutMe}
                style={modalFormStyle}
              >
                <aside className={styles.rigthButton}>
                  <button className={styles.closeButton} onClick={closeAboutMe}>
                    X
                  </button>
                
                </aside>
                <h1>About me</h1>
                {
                    user && 
                    <Formik
                      validationSchema={object({
                        about_me: string().min(10).max(750).required("About me is necessary.")
                      })}
                      initialValues={user}
                      onSubmit={async(values)=>{
                        const updateAboutMe = {
                          about_me: values.about_me,
                        };
                        
                        try {
                          const response = await fetch(
                            `http://localhost:5000/users/update/aboutme/${user.id}`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer${localStorage.getItem("jwtToken")}`,
                              },
                              body: JSON.stringify(updateAboutMe),
                            }
                          );
             
                          if (response.ok) {
                            // Authentication successful
                            const data = await response.json();
                            console.warn("User update:", data);
                            user.about_me = values.about_me;
                            } else {
                            // Authentication failed
                            console.error("Update failed:", response.statusText);
                          }
                        } catch (error) {
                          console.error("Error during update:", error);
                        }
                      }}
                    >
                      <Form>
                      <ul className={styles.listForm}>
                        <li>
                        <Field
                          label="About me"
                          name="about_me"
                          type="textarea"
                          as="textarea"
                       />  
                          <ErrorMessage name="about_me"/>
                      </li>
                      <li>
                        <button
                          className={styles.buttonApplication}
                          onClick={Submit}
                          type="submit"
                        >
                          Update my about me
                        </button>
                      </li>
                      </ul>
                 
                      </Form>  
                    </Formik>
                  }
              </Modal>
            )}
    </div>
  )
}

export default AboutMe