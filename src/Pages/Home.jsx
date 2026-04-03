import { useState } from "react";
import useTodos from "../Hooks/useTodos";
import TodoForm from "../component/TodoForm";
import TodoList from "../component/TodoList";

export default function Home() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-6 lg:p-12">
      <div className="w-full max-w-3xl bg-slate-800/40 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] shadow-2xl border border-slate-700/50">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
           My Todo App
          </h1>
          <p className="text-slate-400">Stay organized and productive.</p>
        </header>

        <TodoForm addTodo={addTodo} />

        {/* Filter Bar */}
        <div className="flex gap-2 p-1 bg-slate-900/50 rounded-xl mt-8 w-fit mx-auto">
          {["all", "pending", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-lg capitalize transition-all duration-300 cursor-pointer text-sm font-medium ${
                filter === type 
                ? "bg-indigo-600 text-white shadow-lg" 
                : "text-slate-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No tasks to show in this view.</p>
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          )}
        </div>

        {/* Footer Stats */}
        <footer className="mt-10 pt-6 border-t border-slate-700/50 flex justify-between text-slate-500 text-sm">
           <span>{todos.filter(t => !t.completed).length} items left</span>
           <span>Today, {new Date().toLocaleDateString()}</span>
        </footer>
      </div>
    </div>
  );
}