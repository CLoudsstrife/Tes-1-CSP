import { useEffect, useState } from "react";
import styles from "./TimerSesi.module.css";

function formatWaktu(totalDetik) {
  const mm = String(Math.floor(totalDetik / 60)).padStart(2, "0");
  const ss = String(totalDetik % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDetik((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <p className={styles.timer}>
      Lama sesi: <strong>{formatWaktu(detik)}</strong>
    </p>
  );
}
