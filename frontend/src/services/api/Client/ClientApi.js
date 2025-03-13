import { axiosClient } from "../../../api/axios.js";
const ClientApi = {

  getCsrfToken: async () => {
    return await axiosClient.get("/sanctum/csrf-cookie", {
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: true
    })
  },

  login: async (email, password) => {
    await ClientApi.getCsrfToken();
    return await axiosClient.post('/login', { email, password }, {
      withCredentials: true
    });
  },
  logout: async () => {
    return await axiosClient.post('/logout', {}, {
      withCredentials: true,
    })
      .then(response => {
        console.log("Logged out successfully");
        localStorage.removeItem('token');
      })
      .catch(error => {
        console.error("Logout error", error.response);

      });
  },
  getUser: async () => {
    const token = await ClientApi.getCsrfToken();
    console.log("token", localStorage.getItem('token'))
    return await axiosClient.get('/user', {
      withCredentials: true,
    });
  },
}
export default ClientApi;

