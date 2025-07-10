import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { isSessionValid } from '../lib/session';
import LogoutButton from './logout-btn'; 
export default async function Header() {

  const isLogged = await isSessionValid();
    let userEmail: string = "";
    console.log("isLogged:", isLogged);
    if(isLogged)
    {
        userEmail = isLogged?.userEmail as string;
    }
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
      {isLogged && <LogoutButton/>}
      {!isLogged && <Link className={styles.loginButton} href="/login">Login</Link>}     
    </header>
  );
}