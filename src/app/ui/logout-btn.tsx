
//import '@/app/styles/logout.css';
import { redirect } from "next/navigation";
import { deleteSessionCookie } from "../lib/session"
import styles from "../styles/Header.module.css";

export default function LogoutButton(){

    const logout = async () => {
        'use server';
        await deleteSessionCookie();
        redirect('/login');
    }

    return(
        <form action={logout} className='logoutForm'>
            <button className={styles.loginButton}>Logout</button>
        </form>
    )
    
}