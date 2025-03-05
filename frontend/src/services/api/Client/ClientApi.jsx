import { axiosClient } from "../../../api/axios.js";
const ClientApi = {

  getCsrfToken: async () => {
    return await axiosClient.get("/sanctum/csrf-cookie", {
      baseURL: import.meta.env.VITE_BACKEND_URL
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
  // logout: async () => {
  //   return await axiosClient.post('/logout', {}, {
  //     withCredentials: true,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).then(response => {
  //     console.log("Logged out successfully");
  //   }).catch(error => {
  //     console.error("Logout error", error.response);
  //   });

  // },
  //          getUser : async ()=> {

  //         return await axiosClient.get('/login')
  // },
  getUser: async () => {
    return await axiosClient.get('/user', {
      withCredentials: true, 
    });
  },


}
export default ClientApi;


