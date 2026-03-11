import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

//
// ✅ REQUEST INTERCEPTOR (FIXED)
//
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token"); // ✅ FIX NAME
    const language = localStorage.getItem("language") || "fr";

    // ✅ DO NOT SEND TOKEN FOR AUTH ROUTES
    if (
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/register")
    ) {
      config.headers["Accept-Language"] = language;
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Accept-Language"] = language;

    return config;
  },
  (error) => Promise.reject(error)
);

//
// ✅ RESPONSE INTERCEPTOR (FIXED + SAFE)
//
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ skip auth endpoints
    if (
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh-token");
        const newToken = res.data.accessToken;

        // ✅ FIX storage key
        localStorage.setItem("access-token", newToken);

        // update default header
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // ✅ OPTIONAL: logout if refresh fails
        localStorage.removeItem("access-token");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;