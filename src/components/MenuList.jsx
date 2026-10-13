import MenuCard from "./MenuCard";
import styles from "./MenuList.module.css";

export default function MenuList({ daftar, keyword, kategori, onTambah }) {
  if (daftar.length === 0) {
    const pesan = keyword
      ? `Tidak ada menu untuk kata kunci "${keyword}"${kategori !== "semua" ? ` di kategori ${kategori}` : ""}.`
      : `Tidak ada menu di kategori ${kategori}.`;
    return <p className={styles.kosong}>{pesan}</p>;
  }
  return (
    <div className={styles.grid}>
      {daftar.map((m) => (
        <MenuCard key={m.id} menu={m} onTambah={onTambah} />
      ))}
    </div>
  );
}
