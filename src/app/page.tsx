import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <Image
            src= '/campo.avif' 
            alt="Estádio de futebol iluminado"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            className={styles.backgroundImage}
          />
          <h1 className={styles.title}>Gerenciador de Ligas de Futebol</h1>
        </div>
      </main>
    </div>
  );
}