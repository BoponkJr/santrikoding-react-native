# SantriKoding - Aplikasi Mobile React Native

Aplikasi mobile berbasis **React Native** yang terintegrasi dengan RESTful API Express.js untuk manajemen postingan (*CRUD Posts with Image Upload*).

## 📱 Fitur Aplikasi
- **Daftar Posts**: Menampilkan list card postingan beserta thumbnail foto dari server Express.
- **Tambah Post**: Form penambahan data post baru dengan fitur upload foto langsung dari galeri HP (*Image Picker*).
- **Edit Post**: Form pengubahan data post dan penggantian gambar.
- **Hapus Post**: Menghapus data post disertai pop-up dialog konfirmasi.
- **Pull to Refresh**: Memperbarui data post secara realtime dengan menarik layar ke bawah.
- **React Navigation**: Stack navigation native antar screen yang halus.

## 🛠️ Tech Stack
- **Framework**: React Native (0.77.0)
- **Navigation**: React Navigation Native Stack
- **HTTP Client**: Axios
- **Image Picker**: react-native-image-picker
- **Target Platform**: Android & iOS

## 🚀 Cara Menjalankan Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Jalankan Metro Bundler**:
   ```bash
   npm start
   ```

3. **Jalankan ke Android Emulator / Device**:
   ```bash
   npm run android
   ```

> **Catatan**: Pastikan Backend Server Express (`santrikoding-express-api`) sudah aktif di `http://localhost:3000` sebelum menjalankan aplikasi.
