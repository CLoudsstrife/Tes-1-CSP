import Badge from "./Badge";
import styles from "./MenuCard.module.css";

export default function MenuCard({ menu, onTambah }) {
  const habis = menu.stok === 0;
  return (
    <article className={`${styles.kartu} ${habis ? styles.habis : ""}`}>
      <div className={styles.atas}>
        <h3>{menu.nama}</h3>
        {habis ? <Badge variant="bahaya">Habis</Badge> : <Badge>{menu.kategori}</Badge>}
      </div>
      <p className={styles.harga}>Rp {menu.harga.toLocaleString("id-ID")}</p>
      <p className={styles.stok}>Stok: {menu.stok}</p>
      <button type="button" disabled={habis} onClick={() => onTambah(menu)}>
        Tambah
      </button>
    </article>
  );
}
