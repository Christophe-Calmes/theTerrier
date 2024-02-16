import styles from "../../pages/styles/profile.module.css";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import Modal from "react-modal";
const API = import.meta.env.VITE_API_ADRESS;
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
function UpdateMyProfilUser({ user }) {
    const [isUpdate, setIsUpdate] = useState(false);
    const openUpdateMyProfil = () => {
        setIsUpdate(true);
      };
      const closeUpdateProfil = () => {
        setIsUpdate(false);
      };
      const Submit = (values) => {
        console.info(values);
      };
  return (
    <div>
                    <button
              className={styles.buttonApplication}
              onClick={openUpdateMyProfil}
            >
              update my profil
            </button>
            {isUpdate && (
              <Modal
                isOpen={isUpdate}
                onRequestClose={closeUpdateProfil}
                style={modalFormStyle}
              >
                <aside className={styles.rigthButton}>
                  <button
                    className={styles.closeButton}
                    onClick={closeUpdateProfil}
                  >
                    X
                  </button>
                </aside>
                <h1 className={styles.title1}>Update my profil</h1>
                { user && 
         <Formik
         validationSchema={object({
           username: string()
             .required("Your username is essential !")
             .min(1)
             .max(30),
           email: string()
             .email()
             .required("Email is necessary.")
             .max(60),
           city: string()
             .required("You living in a city or a prairie ?")
             .max(40),
         })}
         initialValues={user}
         onSubmit={async (values) => {
           const updateUser = {
             email: values.email,
             username: values.username,
             city: values.city,
             gender: values.gender,
             profil_picture: values.profil_picture,
           };
           console.info(JSON.stringify(updateUser));

           try {
             const response = await fetch(
               `${API}/users/update/${user.id}`,
               {
                 method: "PUT",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify(updateUser),
               }
             );

             if (response.ok) {
               // Authentication successful
               const data = await response.json();
               console.warn("User update:", data);

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
               <label>Email</label>
               <Field name="email" />
               <ErrorMessage name="email" />
             </li>
             <li>
               <label>Pseudo</label>
               <Field name="username" />
               <ErrorMessage name="username" />
             </li>
             <li>
               <label>City</label>
               <Field name="city" />
               <ErrorMessage name="city" />
             </li>
             <li>
               <label>Your gender :</label>
               <Field
                 className={styles.select}
                 as="select"
                 name="gender"
               >
                 <option value="1">Male</option>
                 <option value="2">Female</option>
                 <option value="3">Other</option>
               </Field>
             </li>
             <li>
               <label>Profile Picture</label>
               <Field
                 className={styles.select}
                 name="file"
                 as="input"
                 type="file"
                 accept="image/jpeg"
               />
             </li>
           </ul>
           <button
             className={styles.buttonApplication}
             onClick={Submit}
             type="submit"
           >
             Update my profil
           </button>
         </Form>
       </Formik>
                }
       
              </Modal>
            )}
    </div>
  )
}

export default UpdateMyProfilUser