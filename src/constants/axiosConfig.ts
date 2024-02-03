// import axios, { AxiosInstance, AxiosError } from "axios";

// const instance: AxiosInstance = axios.create({
//   baseURL: "https://openapiv1.coinstats.app/",
//   headers: {
//     accept: "application/json",
//     "X-API-KEY": "itVnfqF7OIBB8hRd8Ph/L7P/27ZlKKtqrqNCARg/sNM=",
//   },
// });

// //before fetching operations
// // instance.interceptors.request.use((config) => {
// //   return config;
// // });

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error:", error.message);
//       console.error("Response data:", error.response?.data);
//     } else {
//       console.error("Error:", error);
//     }
//     return Promise.reject(error.message);
//   }
// );

// export default instance;
import axios, { AxiosInstance, AxiosError } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://openapiv1.coinstats.app/",
  headers: {
    accept: "application/json",
    "X-API-KEY": "itVnfqF7OIBB8hRd8Ph/L7P/27ZlKKtqrqNCARg/sNM=",
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      console.error("Response data:", error.response?.data);
    } else {
      console.error("Error:", error);
    }
    return Promise.reject(error);
  }
);

export default instance;
