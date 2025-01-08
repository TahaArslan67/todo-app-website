"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  difficulty: "kolay" | "orta" | "zor";
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [difficulty, setDifficulty] = useState<"kolay" | "orta" | "zor">("orta");

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setTodos([
        ...todos,
        { 
          id: Date.now(), 
          text: input.trim(), 
          completed: false,
          difficulty: difficulty
        },
      ]);
      setInput("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const TodoList = ({ difficulty }: { difficulty: "kolay" | "orta" | "zor" }) => {
    const filteredTodos = todos.filter(todo => todo.difficulty === difficulty);
    const title = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    
    return (
      <div className="flex-1 min-w-[300px] max-w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-700">{title} Görevler</h2>
        <ul className="space-y-3">
          {filteredTodos.map((todo: Todo) => (
            <li
              key={todo.id}
              className="bg-white/70 backdrop-blur-md p-4 rounded-lg shadow-sm hover:shadow transition-all duration-300 hover:bg-white/90"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 mt-1 text-blue-500 transition-transform duration-300 hover:scale-110 flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <span
                    className={`${
                      todo.completed ? "line-through text-gray-500" : "text-gray-800"
                    } transition-all duration-300 break-words block`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-300 flex-shrink-0 w-8"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <main className="min-h-screen p-8 animated-gradient">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-6 transition-all duration-300 hover:bg-white/90">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Yapılacaklar Listesi
        </h1>
        
        <form onSubmit={addTodo} className="mb-8">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              placeholder="Yeni görev ekle..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 bg-white/90"
            />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as "kolay" | "orta" | "zor")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 bg-white/90"
            >
              <option value="kolay">Kolay</option>
              <option value="orta">Orta</option>
              <option value="zor">Zor</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Ekle
            </button>
          </div>
        </form>

        <div className="flex gap-6 justify-center flex-wrap">
          <TodoList difficulty="zor" />
          <TodoList difficulty="orta" />
          <TodoList difficulty="kolay" />
        </div>
      </div>
    </main>
  );
}
