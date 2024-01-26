import React, { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import Modal from "react-modal";
import styles from "./styles/profile.module.css";
import { useAuthContext } from "../context/AuthProvider";
import { useParams } from "react-router-dom";

const updateUser = {
  email: "bozo@gmail.com",
  username: "TheDead",
  city: "Los_Angeles",
  gender: 1,
  profil_picture: null,
};

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

function Profile() {
  // C'est quoi ça ?
  const { currentUser } = useAuthContext();
  // C'est quoi ça ?
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAboutMe, setIsAboutMe] = useState(false);
  const [user, setUser] = useState(null);

console.log(currentUser.id);
  // console.log(currentUser, "currentUser");
  const getUserData = async () => {
    // connect to the server to retrieve user data
    try {

console.log(currentUser.id);
      const response = await fetch(`http://localhost:5000/users/${currentUser.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data, "response getUserData");
      setUser(data.userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // if (currentUser) getUserData(currentUser.id);
    getUserData();
  }, []);

  const openUpdateMyProfil = () => {
    setIsUpdate(true);
  };
  const closeUpdateProfil = () => {
    setIsUpdate(false);
  };
  const openAboutMe = () => {
    setIsAboutMe(true);
  };
  const closeAboutMe = () => {
    setIsAboutMe(false);
  };
  const deleteInterest = (idToDelete) => {
    const newUserInterest = userInterest.filter(
      (interet) => interet.id !== idToDelete
    );
    setUserInterest(newUserInterest);
  };

  const Age = (Birthday) => {
    const dateObject = new Date(user.creation_date);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(
      dateObject
    );

    const BirthdayDate = new Date(Birthday);
    const DDay = new Date();
    let age = DDay.getFullYear() - BirthdayDate.getFullYear();
    const noBirthday =
      DDay.getMonth() > BirthdayDate.getMonth() ||
      (DDay.getMonth() === BirthdayDate.getMonth() &&
        DDay.getDate() >= BirthdayDate.getDate());
    if (!noBirthday) {
      age -= 1;
    }
    return age;
  };

  const Submit = (values) => {
    console.info(values);
  };

  return (
    <div className={styles.contenerRow}>
      {user && (
        <section className="user-profile">
          <article className={styles.borderConteneur}>
            <p>
              <img href={user.profil_picture} alt={user.username} />
            </p>

            <ul className={styles.listProfil}>
              <li className={styles.titleName}> {user.username} </li>
              {/* <li className={styles.info}>Registred since {formattedDate} </li> */}
              <li className={styles.info}>
                {user && Age(user.birthday_date)} year old
              </li>
            </ul>

            <h1 className={styles.title1}>Your actual interest</h1>
            <aside>
              <ul className={styles.listProfil}>
                {user.interests &&
                  user.interests.map((interest) => (
                    <li
                      className={styles.bubble}
                      key={interest.id}
                      onClick={() => deleteInterest(interest.id)}
                    >
                      {interest.interest}
                    </li>
                  ))}
              </ul>
            </aside>
          </article>
        </section>
      )}

      <section>
        <article>
          <aside className={styles.contenerCol}>
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
               `http://localhost:5000/users/update/${user.id}`,
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
            <h1>update my profil</h1>

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
                <p>Formulaire update About Me</p>
              </Modal>
            )}
          </aside>
          <article className={styles.borderConteneur}>
            <h1 className={styles.titleDescription}>Description</h1>
            <p className={styles.textDescription}>{user?.about_me}</p>
          </article>
        </article>
      </section>
    </div>
  );
}

export default Profile;
