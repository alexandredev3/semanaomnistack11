import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.9:3333', // Coloque o ip que aparece la no expo dev tools, e coloca a porta do backend
});

export default api;