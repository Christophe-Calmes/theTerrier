import React, { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import Modal from "react-modal";
import styles from "./styles/profile.module.css";
import { useAuthContext } from "../context/AuthProvider";
import { useParams } from "react-router-dom";
import { Age, getUserData } from "../services/utilities"
import ProfilUser from "../components/ProfilUser/ProfilUser";
import DescriptionUser from "../components/DescriptionUser/DescriptionUser"
import UpdateMyProfilUser from "../components/UpdateMyProfil/UpdateMyProfil";
import AboutMe from "../components/AboutMe/AboutMe";


function Profile() {
  const { currentUser } = useAuthContext();
  const [isAboutMe, setIsAboutMe] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchData = async() => {
      if(currentUser != null) {
        setUser(await getUserData(currentUser.id));
      }
    }
    fetchData();
  }, [currentUser]);

  
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



  return (
    <div className={styles.contenerRow}>
     <ProfilUser user={user} />

      <section>
        <article>
          <aside className={styles.contenerCol}>

            <h1>update my profil</h1>
            <UpdateMyProfilUser user={user}/>
            <AboutMe user={user}/>
          </aside>
    
          <DescriptionUser user={user}/>
        </article>
        
      </section>
    </div>
  );
}

export default Profile;
