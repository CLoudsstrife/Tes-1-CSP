import { useEffect, useState } from "react";
import { semuaMenu } from "./data/menu";
import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import FormMenu from "./components/FormMenu";
import TimerSesi from "./components/TimerSesi";
import Panel from "./components/Panel";
import styles from "./App.module.css";

const KUNCI_KERANJANG = "kantinkita-keranjang";

function bacaKeranjang() {
  const data = localStorage.getItem(KUNCI_KERANJANG);
  return data ? JSON.parse(data) : [];
}

export default function App() {
  const [daftarMenu, setDaftarMenu] = useState(semuaMenu);
  const [keyword, setKeyword] = useState("");
  const [kategori, setKategori] = useState("semua");
  const [keranjang, setKeranjang] = useState(bacaKeranjang);
  const [tampilTimer, setTampilTimer] = useState(true);

  const daftarKategori = ["semua", ...new Set(daftarMenu.map((m) => m.kategori))];
  const hitungKategori = (k) =>
    k === "semua" ? daftarMenu.length : daftarMenu.filter((m) => m.kategori === k).length;
  const menuTampil = daftarMenu.filter(
    (m) =>
      m.nama.toLowerCase().includes(keyword.trim().toLowerCase()) &&
      (kategori === "semua" || m.kategori === kategori)
  );
  const totalItem = keranjang.reduce((acc, i) => acc + i.qty, 0);
  const totalHarga = keranjang.reduce((acc, i) => acc + i.qty * i.harga, 0);

  useEffect(() => {
    localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(keranjang));
  }, [keranjang]);

  useEffect(() => {
    document.title = totalItem > 0 ? `(${totalItem}) KantinKita` : "KantinKita";
  }, [totalItem]);

  const handleTambahKeKeranjang = (menu) => {
    setKeranjang((prev) => {
      const sudahAda = prev.some((i) => i.id === menu.id);
      if (sudahAda) {
        return prev.map((i) => (i.id === menu.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: menu.id, nama: menu.nama, harga: menu.harga, qty: 1 }];
    });
  };

  const handleUbahQty = (id, delta) => {
    setKeranjang((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const handleHapusItem = (id) => {
    setKeranjang((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSimpanMenu = (menuBaru) => {
    setDaftarMenu((prev) => [...prev, { id: Date.now(), ...menuBaru }]);
  };

  return (
    <div className={styles.halaman}>
      <header className={styles.header}>
        <h1>KantinKita</h1>
        <button type="button" onClick={() => setTampilTimer((t) => !t)}>
          {tampilTimer ? "Sembunyikan" : "Tampilkan"} timer
        </button>
      </header>
      {tampilTimer && <TimerSesi />}

      <div className={styles.layout}>
        <main>
          <FilterBar
            keyword={keyword}
            onKeywordChange={setKeyword}
            daftarKategori={daftarKategori}
            kategoriAktif={kategori}
            onKategoriChange={setKategori}
            hitungKategori={hitungKategori}
          />
          <MenuList
            daftar={menuTampil}
            keyword={keyword.trim()}
            kategori={kategori}
            onTambah={handleTambahKeKeranjang}
          />
        </main>
        <aside className={styles.samping}>
          <Panel judul="Keranjang">
            <Keranjang
              items={keranjang}
              totalItem={totalItem}
              totalHarga={totalHarga}
              onUbahQty={handleUbahQty}
              onHapus={handleHapusItem}
            />
          </Panel>
          <Panel judul="Tambah Menu">
            <FormMenu
              daftarKategori={daftarKategori.filter((k) => k !== "semua")}
              onSimpan={handleSimpanMenu}
            />
          </Panel>
        </aside>
      </div>
    </div>
  );
}
