import axios from "axios";
import { useAuthStore } from "@/stores";
import { getRefreshToken } from "@/apis";
import { toast } from "react-toastify";

}

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: {
    indexes: null,
  },
});

const buildAuthorizationHeader = ({
  tokenType,
  accessToken,
}: {
  tokenType: string;
  accessToken: string;
}) => {
  switch (tokenType) {
    case "bearer":
    case "Bearer":
      return `Bearer ${accessToken}`;
    default:
      throw new Error("Invalid token type");
  }
};

axiosClient.interceptors.request.use((config) => {
  const { tokenType, accessToken } = useAuthStore.getState().auth;

  if (tokenType && accessToken) {
    config.headers.Authorization = buildAuthorizationHeader({
      tokenType,
      accessToken,
    });
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const status = response?.status;
    const { auth, logout } = useAuthStore.getState();

    if (status === 401 && !auth.refreshToken) {
      toast.error("로그인이 필요합니다.");
      window.location.replace("/login");
      return Promise.reject(error);
    }

    if (status !== 401 || config.sent || !auth.refreshToken) {
      return Promise.reject(error);
    }

    config.sent = true;
    try {
      const { data } = await getRefreshToken({
        refreshToken: auth.refreshToken,
      });

      if (!data) {
        return Promise.reject(error);
      }

      const { tokenType, accessToken } = data;
      config.headers.Authorization = buildAuthorizationHeader({
        tokenType,
        accessToken,
      });
      useAuthStore.setState({
        auth: {
          ...auth,
          ...data,
        },
      });
    } catch (e) {
      logout();
      toast.info("로그아웃 되었습니다.");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return axios(config);
  },
);
