import { create } from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

const useTodoStore = create(
  devtools((set) => ({
    todos: [],
    loading: true,
    totalPages: 0,
    sortBy: "priority",
    order: "asc",
    checkedFilter: false,
    limit: 10,
    page: 1,
    error: null,
    success: false,
    message: null,
    getTodos: async () => {
      const token = localStorage.getItem("token");
      const { sortBy, order, filterBy, filterValue, page, limit } =
        useTodoStore.getState();
      try {
        set({ loading: true, error: null }); // Veriler alınırken loading true olmalı
        const response = await axios.get("http://localhost:3000/api/todos", {
          headers: {
            Authorization: token,
          },
          params: {
            sortBy,
            order,
            page,
            limit,
          },
        });
        set({
          todos: response.data.data,
          totalPages: response.data.totalPages,
          currentPage: page,
          loading: false, // Veriler başarıyla yüklendiğinde loading false olmalı
          error: null,
        });
      } catch (error) {
        set({
          loading: false,
          error: error.response?.data?.msg || "Hata oluştu",
        });
      }
    },
    // Sıralama alanını ve yönünü güncelle
    setSort: (sortBy, order) => {
      set({ sortBy, order });
      useTodoStore.getState().getTodos();
    },

    // Filtreleme alanını ve değerini güncelle
    toggleCheckedFilter: () => {
      set((state) => ({ checkedFilter: !state.checkedFilter }));
      useTodoStore.getState().getTodos();
    },

    // Sayfa numarasını güncelle
    setPage: (page) => set({ page }),

    addTodos: async (title, description, priority) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:3000/api/todos",
          {
            title: title,
            description: description,
            priority: priority,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        set((state) => ({
          todos: [...state.todos, response.data.data],
        }));
        return { success: true, message: "Product created successfully" };
      } catch (error) {
        set({
          loading: false,
          error: error.response?.data?.msg || "Eklenemedi",
        });
      }
    },
    deleteTodo: async (id) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/todos/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.data.success) {
          return { success: false, message: response.data.message };
        }
        set((state) => ({
          todos: state.todos.filter((todo) => todo._id !== id),
          message: "Task deleted successfully",
        }));
        return { success: true };
      } catch (error) {
        set({
          loading: false,
          error: error.response?.data?.msg || "Silinemedi",
        });
      }
    },
    updateTodo: async (id, completed, title, description, priority) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          `http://localhost:3000/api/todos/${id}`,
          {
            completed: completed,
            title: title,
            description: description,
            priority: priority,
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
          todos: state.todos.map((todo) =>
            todo._id === id ? response.data.data : todo
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
  }))
);

export default useTodoStore;
