import axios from 'axios';

export const axiosClient = axios.create(
    {
         baseURL: import.meta.env.VITE_BACKEND_URL+'/api',
       // baseURL:"http://localhost:8000",
        withCredentials:true,
        withXSRFToken: true,

    }
)