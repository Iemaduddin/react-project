# 📘 Dokumentasi Proyek Manajemen Konten Berbasis Role

## 📌 Deskripsi

Aplikasi ini merupakan sistem manajemen konten (CMS) yang memiliki dashboard berbeda tergantung pada peran pengguna. Proyek ini dibangun menggunakan **React** (Frontend), **Laravel / Express / Adonis / API lainnya (Backend)** dan menyimpan data user login di `localStorage`.

## 🧑‍💼 Peran Pengguna (`role`)

Terdapat 5 role utama dalam sistem ini:

1. `superadmin`
2. `admin`
3. `editor`
4. `author`
5. `member` (hanya bisa melihat, tidak memiliki dashboard khusus)

---

## 📋 Isi Dashboard Berdasarkan Role

### 1. 🟢 Superadmin

- Statistik Global (Total User, Postingan, Kategori)
- Manajemen User
- Manajemen Kategori
- Manajemen Postingan

### 2. 🔵 Admin

- Statistik Global ( Postingan, Kategori)
- Manajemen Kategori
- Manajemen Postingan

### 3. 🟣 Editor

- Statistik Postingan Editor
- Manajemen Postingan

### 4. 🟠 Author

- Statistik Pribadi (Postingan milik sendiri)
- Buat Postingan Baru
- Lihat/Edit Postingan Sendiri

### 5. ⚪ Member

- Hanya dapat membaca konten (read-only)
