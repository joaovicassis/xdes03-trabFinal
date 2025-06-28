// src/app/not-found.tsx
import Link from 'next/link';
import styles from './error.module.css';
import Image from 'next/image';

import bolaPraFora from '../../public/gif404.gif';

export default function NotFound() {
  return (
    <div className={styles.errorPage}>
      <Image
        src={bolaPraFora}
        alt="Bola chutada para fora do campo - Erro 404"
        width={350} 
        height={262} 
        priority 
        className={styles.errorImage}
      />

      <p className={styles.errorMessage}>404 - Página não encontrada</p>
      <p className={styles.errorDescription}>
        Parece que a página que você procurava foi chutada para fora da área. Não conseguimos encontrá-la, mas o jogo continua!
      </p>

      <Link href="/" className={styles.backButton}>
        Voltar para o Campo
      </Link>
    </div>
  );
}