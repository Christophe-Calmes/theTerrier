import styles from "../../pages/styles/profile.module.css";

function DescriptionUser({ user }) {
  return (
    <div>
        <article className={styles.borderConteneur}>
            <h1 className={styles.titleDescription}>Description</h1>
            <p className={styles.textDescription}>{user?.about_me}</p>
        </article>
    </div>
  )
}

export default DescriptionUser