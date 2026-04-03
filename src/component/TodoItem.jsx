export default function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <div className="flex justify-between items-center bg-slate-800/50 border border-slate-700 p-4 rounded-xl mt-4 hover:border-slate-500 transition-all duration-200 group">
      <div 
        onClick={() => toggleTodo(todo.id)} 
        className="flex items-center gap-4 flex-1 cursor-pointer"
      >
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed ? "bg-emerald-500 border-emerald-500" : "border-slate-500"
        }`}>
          {todo.completed && <span className="text-white text-xs">✓</span>}
        </div>
        <span className={`text-lg transition-all ${
          todo.completed ? "line-through text-slate-500" : "text-slate-200"
        }`}>
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-400 transition-all duration-200 cursor-pointer"
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}