// import axios
import axios from 'axios';

// inisialisasi instance axios
// Catatan: 10.0.2.2 adalah alamat IP localhost komputer jika diakses dari Android Emulator
const Api = axios.create({
    baseURL: 'http://10.0.2.2:3000',
});

export default Api;
