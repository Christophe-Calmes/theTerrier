import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import styles from "./styles/profile.module.css";

function Admin() {
  const { isAdmin } = useAuthContext();

  return (
    <div>
      {isAdmin && (
        <section>
          <article>
            <h1 className={styles.title1}>Existing interest</h1>
            <ul>
              <li className={styles.textDescription}>Valid interests</li>
            </ul>
          </article>
        </section>
      )}
    </div>
  );
}

export default Admin;
