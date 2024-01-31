import styles from "../../pages/styles/profile.module.css";
import { Age } from "../../services/utilities";

const profilUser = ({ user }) => {
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
                {user.interests &&
                  user.interests.map((interest) => (
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