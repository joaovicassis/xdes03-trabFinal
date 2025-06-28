// src/app/error.tsx
'use client'; // Isso é necessário para componentes de erro no Next.js App Router

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Você pode logar o erro para um serviço de monitoramento aqui
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorCode}>500</h1>
      <h2 className={styles.errorMessage}>Cartão Vermelho para o Servidor!</h2>
      <p className={styles.errorDescription}>
        Oops! Nosso servidor levou um cartão vermelho inesperado e não conseguiu completar a jogada.
        Estamos trabalhando para colocá-lo de volta no jogo o mais rápido possível.
      </p>
      <button className={styles.backButton} onClick={() => reset()}>
        Tentar Novamente (Reiniciar Jogo)
      </button>
      <Link href="/" className={styles.backButton} style={{ marginTop: '15px' }}>
        Voltar ao Início
      </Link>
    </div>
  );
}