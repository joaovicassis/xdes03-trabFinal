import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>Home</li>
            </ul>
          </nav>
          <button className={styles.loginButton}>Login</button>
        </header>

        <div className={styles.heroSection}>
          <Image
            src= '/campo.avif' 
            alt="Estádio de futebol iluminado"
            layout="fill"
            objectFit="cover"
            quality={100}
            className={styles.backgroundImage}
          />
          <h1 className={styles.title}>Sistema de gerenciamento de futebol</h1>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Projeto CRUD Futebol - João Victor</p>
      </footer>
    </div>
  );
}