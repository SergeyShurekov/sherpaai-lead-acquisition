import Link from "next/link";

import styles from "./SiteShell.module.css";

interface BreadcrumbsProps {
  current: string;
}

export function Breadcrumbs({ current }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
      <Link href="/" className={styles.breadcrumbLink}>
        Главная
      </Link>

      <span aria-hidden="true" className={styles.breadcrumbSeparator}>
        /
      </span>

      <a
        href="https://sherpaai.ru/bot/chat-bot-rekruting/"
        className={styles.breadcrumbLink}
      >
        Sherpa AI
      </a>

      <span aria-hidden="true" className={styles.breadcrumbSeparator}>
        /
      </span>

      <span aria-current="page" className={styles.breadcrumbCurrent}>
        {current}
      </span>
    </nav>
  );
}
