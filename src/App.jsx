import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';


const Herecontext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); 
  };

  return (
    <Herecontext.Provider value={{ theme, toggleTheme }}>
      {children}
    </Herecontext.Provider>
  );
};


const TodoApp = () => {
  
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const updatedTodos = [...todos, { text: newTodo, completed: false }];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); 
    setNewTodo(''); 
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); 
  };

  const { theme, toggleTheme } = useContext(ThemeContext); 

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>livin</h1>
        <button onClick={toggleTheme}>Click</button>
      </header>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => handleToggleTodo(index)}
            className={todo.completed ? 'completed' : ''}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};


const App = () => {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
};

export default App;
