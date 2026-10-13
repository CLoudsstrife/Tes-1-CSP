import { useState } from "react";
import styles from "./Keranjang.module.css";

export default function Keranjang({ items, totalItem, totalHarga, onUbahQty, onHapus }) {
  const [konfirmasiId, setKonfirmasiId] = useState(null);

  if (items.length === 0) {
    return <p className={styles.kosong}>Keranjang masih kosong.</p>;
  }

  return (
    <div>
      <ul className={styles.daftar}>
        {items.map((i) => (
          <li key={i.id} className={styles.baris}>
            <div className={styles.info}>
              <strong>{i.nama}</strong>
              <span>Rp {i.harga.toLocaleString("id-ID")}</span>
            </div>
            <div className={styles.qty}>
              <button type="button" aria-label={`Kurangi ${i.nama}`} onClick={() => onUbahQty(i.id, -1)}>−</button>
              <span>{i.qty}</span>
              <button type="button" aria-label={`Tambah ${i.nama}`} onClick={() => onUbahQty(i.id, 1)}>+</button>
            </div>
            {konfirmasiId === i.id ? (
              <div className={styles.konfirmasi}>
                <button
                  type="button"
                  className={styles.bahaya}
                  onClick={() => { onHapus(i.id); setKonfirmasiId(null); }}
                >
                  Yakin?
                </button>
                <button type="button" onClick={() => setKonfirmasiId(null)}>Batal</button>
              </div>
            ) : (
              <button type="button" onClick={() => setKonfirmasiId(i.id)}>Hapus</button>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.ringkasan}>
        <span>{totalItem} item</span>
        <strong>Rp {totalHarga.toLocaleString("id-ID")}</strong>
      </div>
    </div>
  );
}
