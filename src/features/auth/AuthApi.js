import api from "../../api/api";

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
// ─────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────
export const logoutUser = async () => {
  try {
    // Tell server to clear the HttpOnly cookie
    await api.post("/auth/logout");
  } catch {
    // Even if server fails, clear local state
  } finally {
    useAuthStore.getState().clearAuth();
    window.location.href = "/login";
  }
};

// ─────────────────────────────────────────
// REFRESH — called once on app startup
// ─────────────────────────────────────────
export const refreshAccessToken = async () => {
  try {
    // Cookie is sent automatically → server returns new access token
    const response = await api.post("/auth/refresh");

    const { access_token, user } = response.data;
    useAuthStore.getState().setAuth(access_token, user);

    return true; // user is still logged in
  } catch {
    useAuthStore.getState().clearAuth();
    return false; // session expired → user must login again
  }}


  export function isAuthenticated() {
  return !!localStorage.getItem("access-token");
}
