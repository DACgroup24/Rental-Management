import { authApi } from "./api";

const authService = {
  // Changed email to uname to match your Spring Boot backend
  async login(uname, password) {
    const res = await authApi.post("/auth/login", { uname, password });

    // LoginResponseDTO on the backend returns { user: {...}, token: "..." },
    // NOT the user fields flattened at the top level. Unwrapping here means
    // every caller (AuthContext, localStorage) always deals with a flat
    // user object, which is what role checks (user.role.rid) rely on.
    const { user, token } = res.data;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token || "logged-in");
    }

    return user;
  },

  async register(payload) {
    // RegisterController in Rental-management is mapped at
    // @RequestMapping("/api"), so the real endpoint is /api/register,
    // not /auth/register.
    const res = await authApi.post("/auth/register", payload);
    return res.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};

export default authService;
