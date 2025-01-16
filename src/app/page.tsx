"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  difficulty: "kolay" | "orta" | "zor";
}

interface TodoListProps {
  difficulty: "kolay" | "orta" | "zor";
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [difficulty, setDifficulty] = useState<"kolay" | "orta" | "zor">("orta");
  const [backgroundColor, setBackgroundColor] = useState("#ee7752");
  const [isAutoColorChange, setIsAutoColorChange] = useState(true);
  const [noteColor, setNoteColor] = useState("#f8f4e8");
  const [lineColor, setLineColor] = useState("#e5e5e5");
  const [spiralColor, setSpiralColor] = useState("#d1d5db");

  const generateRandomColor = () => {
    const colors = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab", "#9b4dca", "#38ef7d", "#11998e", "#40E0D0"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoColorChange) {
      interval = setInterval(() => {
        setBackgroundColor(generateRandomColor());
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoColorChange]);

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

  const TodoList: React.FC<TodoListProps> = ({ difficulty }) => {
    const filteredTodos = todos.filter((todo: Todo) => todo.difficulty === difficulty);
    const title = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    
    return (
      <div className="flex-1 min-w-[300px] max-w-[400px]">
        <h2 className="text-2xl font-handwriting mb-6 text-center text-gray-800 border-b-2 border-gray-300 pb-2">
          {title} Görevler
        </h2>
        <ul className="space-y-4">
          {filteredTodos.map((todo: Todo) => (
            <li
              key={todo.id}
              className="relative pl-8"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="absolute left-0 top-1 w-4 h-4 text-blue-500 transition-transform duration-300 hover:scale-110"
                />
                <div className="flex-grow min-w-0">
                  <span
                    className={`${
                      todo.completed ? "line-through text-gray-400" : "text-gray-700"
                    } font-handwriting text-lg transition-all duration-300 break-words block`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-600 hover:scale-110 transition-all duration-300 font-handwriting text-sm"
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
    <main className="min-h-screen p-8" style={{
      background: backgroundColor,
      transition: "background-color 2s ease-in-out"
    }}>
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-6 mb-8 transition-all duration-300 hover:bg-white/90">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Yapılacaklar Listesi
        </h1>
        
        <form onSubmit={addTodo} className="mb-4">
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
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setDifficulty(e.target.value as "kolay" | "orta" | "zor")}
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

        <div className="max-w-4xl mx-auto bg-white/50 rounded-lg p-2 mb-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
            <div className="inline-flex items-center gap-1">
              <span className="text-gray-600">Arkaplan:</span>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-5 h-5 !p-[0.15rem] rounded cursor-pointer"
              />
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="text-gray-600">Otomatik:</span>
              <input
                type="checkbox"
                checked={isAutoColorChange}
                onChange={(e) => setIsAutoColorChange(e.target.checked)}
                className="w-4 h-4 text-blue-500"
              />
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="text-gray-600">Defter:</span>
              <input
                type="color"
                value={noteColor}
                onChange={(e) => setNoteColor(e.target.value)}
                className="w-5 h-5 !p-[0.15rem] rounded cursor-pointer"
              />
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="text-gray-600">Çizgi:</span>
              <input
                type="color"
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
                className="w-5 h-5 !p-[0.15rem] rounded cursor-pointer"
              />
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="text-gray-600">Spiral:</span>
              <input
                type="color"
                value={spiralColor}
                onChange={(e) => setSpiralColor(e.target.value)}
                className="w-5 h-5 !p-[0.15rem] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div 
          className="relative rounded-lg shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300"
          style={{ backgroundColor: noteColor }}
        >
          <div 
            className="absolute left-0 top-0 w-8 h-full rounded-l-lg flex flex-col justify-evenly items-center"
            style={{ background: `linear-gradient(to right, ${spiralColor}, ${spiralColor}cc)` }}
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-6 h-1 bg-white rounded-full shadow-inner"/>
            ))}
          </div>
          
          <div className="ml-12">
            <div 
              className="absolute inset-0 ml-12" 
              style={{
                background: `repeating-linear-gradient(${noteColor}, ${noteColor} 31px, ${lineColor} 31px, ${lineColor} 32px)`,
                opacity: 0.4,
                zIndex: 0
              }}
            />

            <div className="relative z-10 flex gap-6 justify-center flex-wrap">
              <TodoList difficulty="zor" />
              <TodoList difficulty="orta" />
              <TodoList difficulty="kolay" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
