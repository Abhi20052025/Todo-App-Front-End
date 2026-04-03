import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/todos`;

// GET
export const fetchTodos = () => axios.get(API_URL);

// ✅ FIXED HERE
export const createTodo = (todo) =>
  axios.post(API_URL, { title: todo });

// UPDATE
export const updateTodo = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

// DELETE
export const deleteTodo = (id) =>
  axios.delete(`${API_URL}/${id}`);