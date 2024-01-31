import styles from "../../pages/styles/profile.module.css";
import { Age } from "../../services/utilities";
import { useState, useEffect } from "react";

const profilUser = ({ user }) => {
  const [userInterests, setUserInterests] = useState([]);
  useEffect(()=> {
    if(user) {
      setUserInterests(user.interests);
    }
   
  }, [user]);

  const deleteInterest = async (idToDelete) => {
    try {
      const response = await fetch(
        `http://localhost:5000/haveinterests/${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({interest_id: idToDelete}),
        }
      );
 
      if (response.status === 204) {
        const newUserInterest = userInterests.filter(
          (interet) => interet.id !== idToDelete
        );
        setUserInterests(newUserInterest);
        } else {
        console.error("Update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <div> {user && (
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
                {userInterests.length > 0 &&
                  userInterests.map((interest) => (
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
      </div>
  )
}

export default profilUser