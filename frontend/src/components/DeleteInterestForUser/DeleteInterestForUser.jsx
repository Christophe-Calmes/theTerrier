import { useState, useEffect } from "react";
import styles from "../../pages/styles/profile.module.css";
const DeleteInterestForUser = ({DataUserInterests, id}) => {
    const [userInterests, setUserInterests] = useState([]);
    const deleteInterest = async (idToDelete) => {
        try {
          const response = await fetch(
            `http://localhost:5000/haveinterests/${id}`,
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
            console.error("Delete failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error during Delete:", error);
        }
      };
  useEffect(()=> {
    if(DataUserInterests) {
      setUserInterests(DataUserInterests);

    }
  }, []);

  return (
    <div>
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
    </div>
  )
}
export default DeleteInterestForUser;
