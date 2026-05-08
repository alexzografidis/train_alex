import { useState, useEffect } from 'react';

const API = '/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(setTasks);
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input }),
    });
    const task = await res.json();
    setTasks(prev => [...prev, task]);
    setInput('');
  }

  async function toggleTask(id) {
    const res = await fetch(`${API}/${id}`, { method: 'PATCH' });
    const updated = await res.json();
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  }

  async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <>
      <h1>Task Manager</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item${task.completed ? ' completed' : ''}`}>
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-title">{task.title}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
