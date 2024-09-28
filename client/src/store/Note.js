import { create } from "zustand";
import axios from "axios";
import { axiosInstance } from "../lib/axios";
const useNoteStore = create((set) => ({
  notes: [],
  loading: true,
  error: null,
  success: false,
  message: null,
  getNotes: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get("/notes", {
        headers: {
          Authorization: token,
        },
      });
      set({ notes: response.data.data, loading: false, error: null });
    } catch (error) {
      set({ loading: false, eerror: error.response?.data?.msg || "Hata " });
    }
  },
  addNotes: async (title, body, tags) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/notes",
        {
          title: title,
          body: body,
          tags: tags,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      set((state) => ({
        notes: [...state.notes, response.data.data],
      }));
      return { success: true, message: "Notes created successfully" };
    } catch (error) {
      set({ loading: false, error: error.response?.data?.msg || "Eklenemedi" });
    }
  },
  deleteNote: async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(`/notes/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      set((state) => ({
        notes: state.notes.filter((note) => note._id !== id),
      }));
      return { success: true };
    } catch (error) {
      set({ loading: false, error: error.response?.data?.msg || "Silinemedi" });
    }
  },
  updateNote: async (id, title, body, tags) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(
        `/notes/${id}`,
        {
          title: title,
          body: body,
          tags: tags,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Response başarılı olup olmadığını kontrol et
      if (!response.data.success) {
        return { success: false, message: response.data.msg };
      }

      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === id ? response.data.data : note
        ),
      }));

      return { success: true, message: response.data.msg };
    } catch (error) {
      // Hata durumunu işleyin
      return {
        success: false,
        message: error.response?.data?.msg || "Task could not be updated",
      };
    }
  },
}));
export default useNoteStore;
