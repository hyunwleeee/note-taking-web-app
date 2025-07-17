import axios from 'axios';

if (!import.meta.env.VITE_GITHUB_API_URL)
  throw new Error('VITE_GITHUB_API_URL is not set');

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
  },
});

/* 클로저와 커링으로 만들어진 withAuth로 대체 */
// axiosClient.interceptors.request.use((config) => {
//   const { token } = useAuthStore.getState();
//
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
//
// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { response } = error;
//     const status = response?.status;
//
//     if (status === 401) {
//       toast.error('로그인이 필요합니다.');
//       window.location.replace('/login');
//       return Promise.reject(error);
//     }
//
//     return Promise.reject(error);
//   },
// );

export default axiosClient;
