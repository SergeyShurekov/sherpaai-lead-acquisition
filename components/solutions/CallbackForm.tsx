"use client";

import { FormEvent, useState } from "react";

import styles from "./SolutionPageRenderer.module.css";

export function CallbackForm() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = phone.trim();

    if (!value) {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: value }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={styles.callbackSuccess}>
        Заявка отправлена. Мы свяжемся с вами по указанному номеру.
      </p>
    );
  }

  return (
    <form className={styles.callbackForm} onSubmit={handleSubmit}>
      <label className={styles.callbackLabel} htmlFor="callback-phone">
        Номер телефона
      </label>

      <div className={styles.callbackFields}>
        <input
          className={styles.callbackInput}
          id="callback-phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+7 (___) ___-__-__"
          required
        />

        <button
          className={`${styles.button} ${styles.buttonLight}`}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Отправляем..." : "Перезвоните мне"}
        </button>
      </div>

      {status === "error" && (
        <p className={styles.callbackError} role="alert">
          Не удалось отправить заявку. Попробуйте ещё раз.
        </p>
      )}
    </form>
  );
}
