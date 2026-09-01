import styles from "./SiteShell.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shellContainer}>
        <a
          href="https://sherpaai.ru/bot/chat-bot-rekruting/"
          className={styles.footerLink}
        >
          AI-рекрутер Sherpa AI
        </a>
      </div>
    </footer>
  );
}
