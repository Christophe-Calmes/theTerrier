import React from "react";
import styles from "./styles/profile.module.css";

const user = {
  id: 65,
  email: "Bozo@jaimail.com",
  username: "TheDead",
  city: "Los_Angeles",
  birthday_date: "1984-12-09T23:00:00.000Z",
  gender: 1,
  about_me: null,
  creation_date: "2024-01-19T12:40:42.000Z",
  liked: null,
  valid: 1,
  profil_picture: null,
  role: "user",
  level: 1,
};

function Profile() {
  const dateObject = new Date(user.creation_date);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(
    dateObject
  );

  return (
    <div>
      <section>
        <article>
          <h1>Profile</h1>
          <p>
            <img href={user.profil_picture} alt={user.username} />
          </p>
          <p>
            <ul>
              <li> {user.username} </li>
              <li>Registred since {formattedDate} </li>
              <li>Role {user.role}</li>
            </ul>
          </p>
        </article>
      </section>
      <section>
        <article>
          <h1>Description</h1>
          <p>{user.about_me}</p>
        </article>
      </section>
    </div>
  );
}

export default Profile;
