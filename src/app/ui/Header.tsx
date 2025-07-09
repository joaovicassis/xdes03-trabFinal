import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
      <button className={styles.loginButton}>Login</button>
    </header>
  );
}