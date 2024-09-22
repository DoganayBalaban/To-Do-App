import { create } from "zustand";
import axios from "axios";
import { header } from "express-validator";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: true,
  token: localStorage.getItem("token"),
  error: null,
  success: false,
  login: async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      const { user, token } = response.data;

      set({
        success: true,
        user,
        loading: false,
        token: token,
        isAuthenticated: true,
      });
      localStorage.setItem("token", token);
    } catch (error) {
      set({ error: error.response.data.msg, loading: false });
    }
  },
  register: async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password }
      );
      const { user, token } = response.data;
      set({
        success: true,
        user,
        loading: false,
        isAuthenticated: true,
        token: token,
      });
      localStorage.setItem("token", token);
    } catch (error) {
      set({ error: error.response.data.msg, loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false, loading: false });
  },
  getUser: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/auth", {
        headers: {
          Authorization: token,
        },
      });
      set({ user: response.data.data, loading: false, error: null });
    } catch (error) {
      set({ error: error.response.data.msg, loading: false });
    }
  },
  updateProfile: async (name) => {
    try {
      set({ loading: true, error: false });
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/auth/me",
        {
          name: name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return set({
        success: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ error: error.response.data.msg, loading: false });
    }
  },
}));
export default useAuthStore;
