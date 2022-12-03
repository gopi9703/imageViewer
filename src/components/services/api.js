import axios from "axios";
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  // withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    // const token = TokenService.getLocalAccessToken();
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token; // for Node.js Express back-end
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // const originalConfig = err.config;
    // if (originalConfig.url !== "/auth/signin" && err.response) {
    //   // Access Token was expired
    //   if (err.response.status === 401) {
    //     localStorage.removeItem("user");
    //     console.log("session expired");
    //     let navigate = useNavigate();
    //     return navigate("/login");
    //     // originalConfig._retry = true;
    //     // try {
    //     //   const rs = await instance.post("/auth/refreshtoken", {
    //     //     refreshToken: TokenService.getLocalRefreshToken(),
    //     //   });
    //     //   const { accessToken } = rs.data;
    //     //   TokenService.updateLocalAccessToken(accessToken);
    //     //   return instance(originalConfig);
    //     // } catch (_error) {
    //     //   return Promise.reject(_error);
    //     // }
    //   }
    // }
    return Promise.reject(err);
  }
);
export default instance;