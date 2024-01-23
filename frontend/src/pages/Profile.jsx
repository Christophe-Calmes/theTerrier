import React, { useState } from "react";

import styles from "./styles/profile.module.css";

const user = {
  id: 65,
  email: "bozo@jaimail.com",
  username: "TheDead",
  city: "Los_Angeles",
  birthday_date: "1984-12-09T23:00:00.000Z",
  gender: 1,
  about_me: "Hello, i'am TheDead a simple Marmotte in Los Angeles.",
  creation_date: "2024-01-19T12:40:42.000Z",
  liked: null,
  valid: 1,
  profil_picture: null,
  role: "user",
  level: 1,
};
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

function Profile() {
  const [userInterest, setUserInterest] = useState(dataUserInterest);
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

  return (
    <div className={styles.contenerRow}>
      <section>
        <article className={styles.borderConteneur}>
          <p>
            <img href={user.profil_picture} alt={user.username} />
          </p>
          <p>
            <ul className={styles.listProfil}>
              <li className={styles.titleName}> {user.username} </li>
              <li className={styles.info}>Registred since {formattedDate} </li>
              <li className={styles.info}>
                {Age(user.birthday_date)} year old
              </li>
            </ul>
          </p>
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
            <button className={styles.buttonApplication}>
              update my profil
            </button>
            <button className={styles.buttonApplication}>About me</button>
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
