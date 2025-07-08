import Link from 'next/link';
import Image from 'next/image';
import styles from './error.module.css';

export default function NotFound() {
  return (
    <div className={styles.errorPage}>
      <Image
        src="/gif404.gif" 
        alt="Bola chutada para fora do campo - Erro 404"
        fill 
        sizes="100vw" 
        style={{ objectFit: 'cover', zIndex: 1 }}
        priority 
        unoptimized 
      />
      
      <div className={styles.contentOverlay}>
        <p className={styles.errorMessage}>404 - Página não encontrada</p>
        <p className={styles.errorDescription}>
          Parece que a página que você procurava foi chutada para fora da área. Não conseguimos encontrá-la, mas o jogo continua!
        </p>

        <Link href="/" className={styles.backButton}>
          Voltar para o Campo
        </Link>
      </div>
    </div>
  );
}