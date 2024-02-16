import { useAuthContext } from "../../context/AuthProvider";
import DeleteInterestForUser from "../../components/DeleteInterestForUser/DeleteInterestForUser";
import {  getData, getUserData } from "../../services/utilities";
import React, { useState, useEffect } from "react";
import styles from "../styles/profile.module.css";
const API = import.meta.env.VITE_API_ADRESS;
function addInterests() {
  
    const { currentUser } = useAuthContext();
    // User data
    const [user, setUser] = useState({});
    const fetchDataUser = async() => {
      if(currentUser != null) {
        setUser(await getUserData(currentUser.id));
      } else {
        console.error("User not log")
      }
    }
    const [dataInterests, setDataInterests] = useState([]);
    const fetchDataInterests = async () => {
      setDataInterests(await getData(`${API}/interests`))
    }
    useEffect(()=>{
      fetchDataInterests()
      fetchDataUser();
    }, []);
    const SubmitOneInterest = async(idInterest) => {
      const objet = {};
      objet.interest_id = idInterest;
      try {
        const response = await fetch(`${API}/haveinterests/${currentUser.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer${localStorage.getItem("jwtToken")}`
          },
          body: JSON.stringify(objet),
        });
    
        if (!response.ok) {
          console.error("Error:", response.statusText);
          return;
        } else {
          console.info("Add interest for user");
          
        }
        const responseData = await response.json();
        console.log("Success:", responseData);
      } catch (error) {
        
      }
      setUser(fetchDataUser());
    }

  return (
    <div className={styles.contenerRow}>
      <section>
      <h1 className={styles.title1}>Your interests</h1>
         {
          user?.interests &&
          <DeleteInterestForUser DataUserInterests={user.interests} id={user.id} />
         }
      </section>
      <section>
        <h1 className={styles.title1}>Interests </h1>
        <ul className={styles.listProfil}>
        {
          dataInterests.length > 0 &&
          dataInterests.map((interest) => (
            <li className={styles.bubbleAdd} key={interest.id} onClick={() => SubmitOneInterest(interest.id)}>
              Add {interest.name}
            </li>
          ))
        }
          </ul>
        </section>

    </div>
  )
}

export default addInterests
