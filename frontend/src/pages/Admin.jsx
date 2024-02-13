import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import styles from "./styles/profile.module.css";
import { getData } from "../services/utilities";

function Admin() {
  const { isAdmin } = useAuthContext();
  const [dataInterestsValid, setDataInterestsValid] = useState([]);
  const [dataInterestsNoValid, setDataInterestsNoValid] = useState([])
  const fetchDataInterests =  (valid) => {
    return getData(`http://localhost:5000/interests/valid/${valid}`)
  }
  const updateInterest = async () => {
    setDataInterestsValid(await fetchDataInterests(1));
    setDataInterestsNoValid(await fetchDataInterests(0));
  }
useEffect(()=>{
  updateInterest();
},[])
const submitUnValide = async (idInterests) => {
  const updateInterest = dataInterestsValid.find(element => element.id === idInterests);
  updateInterest.valid = 0;
  try {
    const response = await fetch(
      `http://localhost:5000/interests/${idInterests}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(updateInterest),
      }
    );
    if (response.ok) {
      setDataInterestsValid(prevState => prevState.filter(element => element !== updateInterest))
      setDataInterestsNoValid(prevState => [...prevState, updateInterest]);
      const data = await response.json();

    } else {
      console.error("Update failed:", response.statusText);
    }
  }
    catch(error){
      console.error("Error during update interest:", error);
    }

}
const submitValide = async (idInterests) => {
  const updateInterest = dataInterestsNoValid.find(element => element.id === idInterests);
  updateInterest.valid = 1;
  try {
    const response = await fetch(
      `http://localhost:5000/interests/${idInterests}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(updateInterest),
      }
    );
    if (response.ok) {
      setDataInterestsValid(prevState => [...prevState, updateInterest]);
      setDataInterestsNoValid(prevState => prevState.filter(element => element !== updateInterest))
      const data = await response.json();

    } else {
      console.error("Update failed:", response.statusText);
    }
  }
    catch(error){
      console.error("Error during update interest:", error);
    }

}
const deleteInterest = async (idInterest) => {
  console.info(idInterest);
  try {
    const response = await fetch(
      `http://localhost:5000/interests/${idInterest}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${localStorage.getItem("jwtToken")}`,
        },
       
      }
    );

    if (response.status === 204) {
      setDataInterestsNoValid(prevState => prevState.filter(element => element !== updateInterest))
      } else {
      console.error("Delete failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during delete:", error);
  }

}





  return (
    <div>
      {isAdmin && (
        <section>
          <article>
            <h1 className={styles.title1}>Existing interest</h1>
            <ul>
              <li className={styles.textDescription}>Valid interests</li>
              {
                dataInterestsValid.length > 0 &&
                dataInterestsValid.map((validInterest)=>(
                  validInterest.valid === 1 && 
                  <li key={validInterest.id} onClick={()=> submitUnValide(validInterest.id)} > {validInterest.name} </li>
                ))
              }
            </ul>
          </article>
          <article>
            <ul>
              <li className={styles.textDescription}>No valid interests</li>
              {
                dataInterestsNoValid.length > 0 &&
                dataInterestsNoValid.map((element)=>(
                  element.valid === 0 && 
                  <><li key={element.id} onClick={() => submitValide(element.id)}>
                    {element.name}<br />
                  </li><><button onClick={() => deleteInterest(element.id)}>Delete {element.name} </button></></>
                
                ))
              }
            </ul>
          </article>
        </section>
      )}
    </div>
  );
}

export default Admin;
