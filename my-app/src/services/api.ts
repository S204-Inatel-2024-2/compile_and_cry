import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://gymapp-backend-tslk.onrender.com'
})