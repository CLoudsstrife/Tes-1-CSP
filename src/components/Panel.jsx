import styles from "./Panel.module.css";

export default function Panel({ judul, children }) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.judul}>{judul}</h2>
      {children}
    </section>
  );
}
