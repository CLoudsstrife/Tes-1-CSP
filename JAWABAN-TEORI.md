## A1
Hook tidak boleh dipanggil di dalam kondisi, perulangan, atau fungsi bersarang karena React mencocokkan state dengan Hook berdasarkan urutan pemanggilan di setiap render. Bila `useState` kadang dipanggil dan kadang tidak, urutannya bergeser dan state bisa tertukar atau React melempar error. Hook harus selalu dipanggil di level teratas komponen, dalam urutan yang sama. 

## Perbaikan
function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");
  if (!sudahLogin) return null;
  // ...
}


## A2
`items.push(baru)` memutasi array yang sama, lalu `setItems(items)` mengirim referensi yang sama. React membandingkan state lama dan baru dengan `Object.is`, melihat tidak ada perubahan, sehingga tidak me-render ulang. Itulah sebabnya `console.log` menunjukkan data bertambah tetapi layar tetap. State harus diperbarui secara immutable dengan membuat array baru. 
Perbaikan: `setItems((prev) => [...prev, baru]);`


## A3
(a) array berjalan setelah setiap render. (b) `[]` berjalan sekali setelah render pertama. (c) `[kota]` berjalan setelah mount dan setiap kali nilai `kota` berubah. Cleanup function dijalankan sebelum efek dijalankan ulang akibat perubahan dependency, dan waktu komponen di-unmount.

## A4
State `keyword` disimpan di induk terdekat yang sama dari `FilterBar` dan `DaftarMenu`, sebab komponen bersaudara tidak bisa berbagi state langsung (lifting state up). Induk meneruskan nilainya ke bawah lewat props, sehingga ada satu sumber kebenaran. Yang "naik" dari `FilterBar` bukan data, melainkan event atau pemberitahuan perubahan, yaitu pemanggilan fungsi callback (misalnya `onKeywordChange`) yang diberikan induk lewat props, dengan nilai baru sebagai argumen.

## A5
Controlled component adalah elemen form yang nilainya dikendalikan state React: atribut `value` diisi dari state dan `onChange` memperbarui state, sehingga state menjadi satu-satunya sumber kebenaran. Satu `handleChange` bisa melayani banyak input karena setiap input punya atribut `name` yang sama dengan nama properti di objek state, dan fungsi memakai computed property name `[e.target.name]: e.target.value`. Pembaruannya memakai spread (`...prev`) agar properti lain tetap terjaga dan state tetap immutable.
