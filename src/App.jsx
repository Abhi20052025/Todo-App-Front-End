import { useState } from "react";
import useTodos from "./Hooks/useTodos";

export default function App() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ FILTER
  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") return todo.status === "pending";
    if (filter === "completed") return todo.status === "completed";
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-slate-800/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-700/50">
        
        {/* HEADER */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            My Todo App
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Stay organized and productive
          </p>
        </header>

        {/* INPUT */}
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your task..."
          />
          <button
            onClick={() => {
              addTodo(text);
              setText("");
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* FILTER */}
        <div className="flex gap-2 mt-6 p-1 bg-slate-900/50 rounded-xl">
          {["all", "pending", "completed"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`flex-1 py-2 rounded-lg capitalize text-sm sm:text-base transition cursor-pointer
                ${
                  filter === item
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* LIST */}
        <ul className="mt-6 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          {filteredTodos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-slate-900/60 px-4 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                
                {/* ✅ CIRCLE */}
                <div
                  onClick={() => toggleTodo(todo._id)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full border-2 cursor-pointer transition
                    ${
                      todo.status === "completed"
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-slate-500 hover:border-green-400"
                    }`}
                >
                  {todo.status === "completed" && "✔"}
                </div>

                {/* TEXT */}
                <span
                  className={`cursor-pointer text-sm sm:text-base ${
                    todo.status === "completed"
                      ? "line-through text-slate-500"
                      : "text-white"
                  }`}
                >
                  {todo.title}
                </span>
              </div>

              {/* DELETE */}
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-400 hover:text-red-600 text-lg cursor-pointer transition"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* EMPTY */}
        {filteredTodos.length === 0 && (
          <p className="text-center text-slate-500 mt-4 text-sm">
            No tasks found
          </p>
        )}

        {/* FOOTER */}
        <footer className="mt-8 pt-4 border-t border-slate-700 flex justify-between text-slate-400 text-sm">
          <span>
            {todos.filter((t) => t.status === "pending").length} items left
          </span>
          <span>{new Date().toLocaleDateString()}</span>
        </footer>
      </div>
    </div>
  );
}