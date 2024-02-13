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
useEffect(async ()=>{
  setDataInterestsValid(await fetchDataInterests(1));
  console.info(dataInterestsValid);
  setDataInterestsNoValid(await fetchDataInterests(0));
},[])

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
                  <li key={validInterest.id}> {validInterest.name} </li>
                ))
              }
            </ul>
          </article>
          <article>
            <ul>
              <li className={styles.textDescription}>No valid interests</li>
              {
                dataInterestsNoValid.length > 0 &&
                dataInterestsNoValid.map((validInterest)=>(
                  <li key={validInterest.id}> {validInterest.name} </li>
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
