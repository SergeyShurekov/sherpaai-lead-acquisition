import type { ReactNode } from "react";

import styles from "./SiteShell.module.css";

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.shellContainer}>
        <div className={styles.headerRow}>
          {children}

          <a className={styles.headerPhone} href="tel:88007007683">
            8 (800) 700-76-83
          </a>
        </div>
      </div>
    </header>
  );
}
