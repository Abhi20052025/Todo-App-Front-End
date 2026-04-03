import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("my-todos");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Sync localStorage
  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ Fetch from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setTodos(res.data);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ ADD
  const addTodo = async (title) => {
    if (!title.trim()) return;

    try {
      const res = await axios.post(API_URL, { title });
      setTodos((prev) => [res.data, ...prev]);
    } catch (error) {
      console.log("Add Error:", error);
    }
  };

  // ✅ DELETE
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // ✅ TOGGLE
  const toggleTodo = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (error) {
      console.log("Toggle Error:", error);
    }
  };

  return { todos, addTodo, deleteTodo, toggleTodo };
}