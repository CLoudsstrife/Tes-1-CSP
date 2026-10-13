import { useState } from "react";
import styles from "./FormMenu.module.css";

const NILAI_AWAL = { nama: "", kategori: "", harga: "", stok: "" };

export default function FormMenu({ daftarKategori, onSimpan }) {
  const [form, setForm] = useState(NILAI_AWAL);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validasi = () => {
    const err = {};
    if (form.nama.trim().length < 3) err.nama = "Nama minimal 3 karakter.";
    if (!form.kategori) err.kategori = "Kategori wajib dipilih.";
    if (form.harga === "" || Number(form.harga) <= 0) err.harga = "Harga harus lebih dari 0.";
    if (form.stok === "" || Number(form.stok) < 0) err.stok = "Stok tidak boleh negatif.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validasi();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    onSimpan({
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok),
    });
    setForm(NILAI_AWAL);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="nama">Nama menu</label>
        <input id="nama" name="nama" value={form.nama} onChange={handleChange} />
        {errors.nama && <small role="alert" className={styles.error}>{errors.nama}</small>}
      </div>
      <div className={styles.field}>
        <label htmlFor="kategori">Kategori</label>
        <select id="kategori" name="kategori" value={form.kategori} onChange={handleChange}>
          <option value="">-- pilih --</option>
          {daftarKategori.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        {errors.kategori && <small role="alert" className={styles.error}>{errors.kategori}</small>}
      </div>
      <div className={styles.field}>
        <label htmlFor="harga">Harga</label>
        <input id="harga" name="harga" type="number" value={form.harga} onChange={handleChange} />
        {errors.harga && <small role="alert" className={styles.error}>{errors.harga}</small>}
      </div>
      <div className={styles.field}>
        <label htmlFor="stok">Stok</label>
        <input id="stok" name="stok" type="number" value={form.stok} onChange={handleChange} />
        {errors.stok && <small role="alert" className={styles.error}>{errors.stok}</small>}
      </div>
      <button type="submit">Tambah menu</button>
    </form>
  );
}
