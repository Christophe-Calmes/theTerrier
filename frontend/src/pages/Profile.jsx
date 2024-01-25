import React, { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {  object, string } from 'yup';
import Modal from 'react-modal';
import styles from "./styles/profile.module.css";

const user = {
  id: 65,
  email: "bozo@jaimail.com",
  username: "TheDead",
  city: "Los_Angeles",
  birthday_date: "1984-12-09T23:00:00.000Z",
  gender: 1,
  about_me: "Hello, i'am The Dead a simple Marmotte in Los Angeles.",
  creation_date: "2024-01-19T12:40:42.000Z",
  liked: null,
  valid: 1,
  profil_picture: null,
  role: "user",
  level: 1,
};
const updateUser = {
  email: "bozo@jaimail.com",
  username: "TheDead",
  city: "Los_Angeles",
  gender: 1,
  profil_picture: null,
}


const dataUserInterest = [
  {
    id: 4,
    interest: "Kant",
  },
  {
    id: 1,
    interest: "La fête",
  },
];

const modalFormStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    with: '50vw',
  },
};

function Profile() {
  const [userInterest, setUserInterest] = useState(dataUserInterest);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAboutMe, setIsAboutMe] = useState(false);
  const [userData, setUserData] = useState(null)

  const getUserData = async() => {
    // connecter au serveur pour récupérer duser data
    const id = 65;
    const response = await fetch(`http://localhost:5000/users/${id}`)
    console.log(response, 'reponse getUserData')
    if(response.status === 200) {
      const dataUser = await response.json();
      return dataUser;
    } else {
      console.error("Error fetch API");
      return null;
    }
 
  }

  useEffect(() => {
    getUserData();

  }, [])

  const openUpdateMyProfil = () => {
    setIsUpdate(true);
  }
  const closeUpdateProfil = () => {
    setIsUpdate(false);
  }
  const openAboutMe = () => {
    setIsAboutMe(true);
  }
  const closeAboutMe = () => {
    setIsAboutMe(false);
  }
  const deleteInterest = (idToDelete) => {
    const newUserInterest = userInterest.filter(
      (interet) => interet.id !== idToDelete
    );
    setUserInterest(newUserInterest);
  };
  const Age = (Birthday) => {
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

  const dateObject = new Date(user.creation_date);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(
    dateObject
  );
  const Submit = (values) => {
    console.info(values);
  }
  return (
    <div className={styles.contenerRow}>
      <section>
        <article className={styles.borderConteneur}>
          <p>
            <img href={user.profil_picture} alt={user.username} />
          </p>

            <ul className={styles.listProfil}>
              <li className={styles.titleName}> {user.username} </li>
              <li className={styles.info}>Registred since {formattedDate} </li>
              <li className={styles.info}>
                {Age(user.birthday_date)} year old
              </li>
            </ul>
 
          <h1 className={styles.title1}>Your actual interest</h1>
          <aside>
            <ul className={styles.listProfil}>
              {userInterest.map((interest) => (
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
      <section>
        <article>
          <aside className={styles.contenerCol}>
            <button className={styles.buttonApplication} onClick={openUpdateMyProfil}>update my profil</button>
            {
              isUpdate && (
                <Modal 
                isOpen={isUpdate}
                onRequestClose={closeUpdateProfil}
                style={modalFormStyle}
                >  
                <aside className={styles.rigthButton}><button className={styles.closeButton} onClick={closeUpdateProfil}>X</button></aside>
                  <h1 className={styles.title1}>Update my profil</h1>
                  <Formik 
                  validationSchema = {
                    object({
                      username: string().required("Your username is essential !").min(1).max(30),
                      email: string().email().required("Email is necessary.").max(60),
                      city: string().required("You living in a city or a prairie ?").max(40)
                    })
                  }
                  initialValues={updateUser} onSubmit={async(values)=> {
                    const updateUser = {
                      email: values.email,
                      username: values.username,
                      city: values.city,
                      gender: values.gender,
                      profil_picture: values.profil_picture,
                    };
                    console.info(JSON.stringify(updateUser));
                  
                    try {
                      const response = await fetch(`http://localhost:5000/users/update/${user.id}`, {

                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateUser),
                      });
                
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
                    }
                  }>
                      <Form>
                        <ul className={styles.listForm}>
                        <li>
                          <label>Email</label>
                          <Field name="email" />
                          <ErrorMessage name="email"/>
                        </li>
                        <li>
                          <label>Pseudo</label>
                          <Field name="username"/>
                          <ErrorMessage name="username"/></li>
                        <li>
                          <label>City</label>
                          <Field name="city"/>
                          <ErrorMessage name="city"/>
                        </li>
                        <li>
                          <label>Your gender :</label>
                          <Field className={styles.select} as="select" name="gender">
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Other</option>
                          </Field>
                      </li>
                      <li>
                        <label>Profile Picture</label>
                        <Field className={styles.select} name="file" as="input" type="file" accept="image/jpeg" />
                      </li>
                    </ul>
                    <button className={styles.buttonApplication} onClick={Submit} type="submit">Update my profil</button>
                      </Form>
                  </Formik>
                </Modal>

              )
            }
            <h1>update my profil</h1>

            <button className={styles.buttonApplication} onClick={openAboutMe}>About me</button>
              {
                isAboutMe && (
                  <Modal
                  isOpen={isAboutMe}
                  onRequestClose={closeAboutMe}
                  style={modalFormStyle}
                  >
                    <aside className={styles.rigthButton}><button className={styles.closeButton} onClick={closeAboutMe}>X</button></aside>
                    <h1>About me</h1>
                    <p>Formulaire update About Me</p>
                  </Modal>
                )
              }

          </aside>
          <article className={styles.borderConteneur}>
            <h1 className={styles.titleDescription}>Description</h1>
            <p className={styles.textDescription}>{user.about_me}</p>
          </article>
        </article>
      </section>
    </div>
  );
}

export default Profile;
