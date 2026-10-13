import { useRef } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar({
  keyword,
  onKeywordChange,
  daftarKategori,
  kategoriAktif,
  onKategoriChange,
  hitungKategori,
}) {
  const inputRef = useRef(null);

  const handleBersihkan = () => {
    onKeywordChange("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.bar}>
      <div className={styles.cari}>
        <input
          ref={inputRef}
          type="search"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="Cari nama menu..."
          aria-label="Cari menu"
          className={styles.input}
        />
        <button type="button" onClick={handleBersihkan}>Bersihkan</button>
      </div>
      <div className={styles.kategori}>
        {daftarKategori.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onKategoriChange(k)}
            className={k === kategoriAktif ? styles.aktif : ""}
          >
            {k} ({hitungKategori(k)})
          </button>
        ))}
      </div>
    </div>
  );
}
