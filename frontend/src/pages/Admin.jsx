import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import styles from "./styles/profile.module.css";
import { getUserData } from "../services/utilities";

function Admin() {
  const { currentUser } = useAuthContext();

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = async () => {
      if (currentUser) {
        console.log(`id${currentUser.id}`);
        const dataUser = await getUserData(currentUser.id);
        console.log(`result${dataUser}`);
        setAdmin(dataUser);
      }
    };

    isAdmin();
  }, [currentUser]);

  console.log(`Ligne 31 ${JSON.stringify(admin)}`);
  return (
    <div>
      {admin?.role === "admin" ? (
        <section>
          <article>
            <h1 className={styles.title1}>Administrateur</h1>
          </article>
        </section>
      ) : (
        <section>
          <article>
            <h1 className={styles.title1}>Pas administrateur</h1>
          </article>
        </section>
      )}
    </div>
  );
}

export default Admin;