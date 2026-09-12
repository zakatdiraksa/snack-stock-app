# 🍿 Snack Stock App

Aplikasi web untuk manajemen stock produk snack jualan online dengan fitur admin panel dan customer view. Bisa diakses di browser HP dan responsif di semua ukuran layar.

## 🎯 Fitur Utama

### Untuk Admin:
- ✅ Login dengan password
- ✅ Tambah, edit, dan hapus produk
- ✅ Kelola stock produk
- ✅ Upload foto produk
- ✅ Atur harga (per kg, pcs, bungkus, dll)
- ✅ Lihat daftar pesanan dari customer
- ✅ Atur nomor WhatsApp untuk menerima pesanan

### Untuk Customer:
- ✅ Lihat katalog produk
- ✅ Tambah item ke keranjang pesanan
- ✅ Isi form pesanan (nama, telepon, alamat)
- ✅ Kirim pesanan langsung ke WhatsApp admin
- ✅ Bagikan link katalog ke calon customer

## 🚀 Cara Menggunakan

### 1. Buka Aplikasi
Buka file `index.html` di browser

### 2. Mode Admin (Untuk Mengelola Stock)
1. Klik tombol **"🔐 Mode Admin"**
2. Login dengan password default: `admin123` (ganti dengan password yang lebih aman di file `app.js`)
3. Anda bisa:
   - Tambah produk baru
   - Edit atau hapus produk
   - Melihat pesanan yang masuk
   - Atur nomor WhatsApp admin

### 3. Mode Customer (Untuk Melihat & Pesan)
1. Klik tombol **"👤 Mode Customer"**
2. Lihat daftar produk yang tersedia
3. Pilih produk dan jumlah pesanan
4. Klik tombol **"Pesan"** untuk menambah ke keranjang
5. Klik **"Lanjut Pesan"** di bagian bawah layar
6. Isi form pesanan (nama, telepon, alamat)
7. Klik **"Kirim ke WhatsApp"** untuk mengirim pesanan ke admin

### 4. Bagikan Link ke Customer
1. Di mode Customer, klik tombol **"🔗 Bagikan Link"**
2. Copy link yang muncul
3. Bagikan ke calon customer melalui media sosial atau chat

## 📱 Struktur Data Produk

Setiap produk berisi:
```
- Nama Produk (misal: Kripik Singkong)
- Foto Produk (URL gambar)
- Harga (misal: 15000)
- Satuan (kg/pcs/bungkus/box)
- Stock (jumlah tersedia)
```

## 🔒 Keamanan

- Data disimpan di **Local Storage** browser (tidak ke server)
- Password admin bisa diubah di file `app.js` (baris 14)
- Setiap device memiliki data terpisah

### Cara Mengganti Password Admin:
Buka file `app.js` dan cari baris:
```javascript
const ADMIN_PASSWORD = 'admin123';
```
Ganti `admin123` dengan password baru Anda.

## 📝 Contoh Data Produk

| Nama | Foto | Harga | Satuan | Stock |
|------|------|-------|--------|-------|
| Kripik Singkong | [URL] | 15000 | pcs | 50 |
| Chitato | [URL] | 12000 | bungkus | 30 |
| Tahu Goreng | [URL] | 20000 | kg | 10 |
| Bakso Goreng | [URL] | 35000 | box | 5 |

## 🌐 Hosting Gratis

Untuk membuat aplikasi ini bisa diakses dari internet:

### Opsi 1: GitHub Pages
1. Ini sudah di GitHub, tinggal enable GitHub Pages
2. Go to Settings → Pages
3. Select branch: `main`
4. Aplikasi akan tersedia di: `https://zakatdiraksa.github.io/snack-stock-app/`

### Opsi 2: Vercel (Gratis & Cepat)
1. Buka https://vercel.com
2. Connect dengan GitHub account
3. Import repository `snack-stock-app`
4. Deploy otomatis

### Opsi 3: Netlify (Gratis & Mudah)
1. Buka https://netlify.com
2. Drag & drop folder ini
3. Aplikasi langsung live

## 📞 WhatsApp Integration

Admin harus mengatur nomor WhatsApp terlebih dahulu:
1. Login sebagai admin
2. Scroll ke bawah ke "Pengaturan WhatsApp Admin"
3. Masukkan nomor (format: 62XXXXXXXXXX)
4. Klik "Simpan Nomor"

Pesanan customer akan dikirim ke nomor ini melalui WhatsApp.

## 🎨 Kustomisasi

### Mengubah Warna
Edit file `styles.css`:
- Warna utama: ganti `#667eea` dengan warna favorit
- Warna hijau: ganti `#27ae60`
- Warna merah: ganti `#e74c3c`

### Mengubah Judul
Edit file `index.html`:
- Cari `<title>Snack Stock - Toko Snack Online</title>`
- Ganti dengan nama toko Anda

## 📱 Responsif & Mobile-Friendly
✅ Cocok di HP (Mobile)
✅ Cocok di Tablet
✅ Cocok di Desktop

## 🛠️ Tech Stack
- HTML5
- CSS3 (Responsive)
- Vanilla JavaScript (ES6)
- Local Storage API
- WhatsApp Web API

## 📋 Fitur yang Bisa Ditambahkan ke Depan
- Database backend (Firebase/MySQL)
- Payment gateway (Midtrans/PayPal)
- Authentication user customer
- Admin dashboard dengan grafik
- Notifikasi email
- SMS integration
- Multi-currency support
- Invoice PDF

## ⚠️ Catatan Penting
1. Data disimpan di Local Storage, akan hilang jika clear cache browser
2. Untuk production, gunakan database backend
3. Pastikan nomor WhatsApp admin valid (format: 62XXXXXXXXXX)
4. Test di berbagai device sebelum share ke customer

## 📞 Support
Jika ada masalah atau pertanyaan, silakan buat issue di repository ini.

---

**Made with ❤️ for Snack Business**
