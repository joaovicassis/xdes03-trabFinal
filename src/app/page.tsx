import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Título da Apresentação */}
        <h1 className={styles.title}>Sistema de Gerenciamento de Futebol</h1>

        {/* Descrição do Projeto CRUD */}
        <p className={styles.description}>
          Bem-vindo ao sistema de gerenciamento completo para o mundo do futebol.
          Aqui você pode listar, adicionar, editar e remover informações sobre times,
          jogadores e partidas de forma fácil e intuitiva. Ideal para acompanhar
          seus dados futebolísticos!
        </p>

        {/* Botão para Login */}
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/login" /* Placeholder para a rota de login */
            rel="noopener noreferrer"
          >
            Entrar
          </a>
          {/* Ocultamos o segundo botão, pois a página de apresentação terá apenas um CTA */}
          {/* <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a> */}
        </div>
      </main>

      <footer className={styles.footer}>
        {/* Links do rodapé simplificados, sem ícones */}
        <p>© 2025 Projeto CRUD Futebol - João Victor</p>
        {/* <a
          href="/sobre"
          rel="noopener noreferrer"
        >
          Sobre
        </a>
        <a
          href="/termos"
          rel="noopener noreferrer"
        >
          Termos de Uso
        </a> */}
      </footer>
    </div>
  );
}