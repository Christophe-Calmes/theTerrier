import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import styles from "./styles/profile.module.css";
import { getUserData, getData } from "../services/utilities";

function Admin() {
  const { currentUser } = useAuthContext();
  const [admin, setAdmin] = useState(false);


  useEffect(() => {
    const isAdmin = async () => {
      if (currentUser) {
        const dataUser = await getUserData(currentUser.id);
        console.log(`result${dataUser}`);
        setAdmin(dataUser);
      }
    };
    isAdmin();
  }, [currentUser]);


  return (
    <div>
      {admin?.role === "admin" &&
        <section>
          <article>
            <h1 className={styles.title1}>Existing interest</h1>

            <ul>
              <li className={styles.textDescription}>Valid interests</li>

            </ul>
          </article>
        </section>
      }
    </div>
  );
}

export default Admin;