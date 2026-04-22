import React, {useState} from "react";


function DailyHabitTracker() {
  const [habits, setHabits] = useState([
    { id: 1, title: "Утренняя зарядка 1 час", completed: false },
    { id: 2, title: "Чтение книг 30 минут", completed: true },
    { id: 3, title: "Пить воду на протяжение всего дня(от 3 л)", completed: false },
    { id: 4, title: "Ложится спать не позднее 22 : 00", completed: false },
  ]);

  const [filter, setFilter] = useState("all");
  const [newTitle, setNewTitle] = useState("");

  const nextId = () => (habits.length === 0 ? 1 : Math.max(...habits.map(h => h.id)) + 1);

  const handleAdd = () => {
    const title = newTitle.trim();
    if (!title) return;
    const habit = { id: nextId(), title, completed: false };
    setHabits(prev => [...prev, habit]);
    setNewTitle("");
  };

  const handleRemove = (id: number) => setHabits(prev => prev.filter(h => h.id !== id));

  const toggleCompleted = (id: number) => {
    setHabits(prev => prev.map(h => (h.id === id ? { ...h, completed: !h.completed } : h)));
  };

  const totalCount = habits.length;
  const completedCount = habits.filter(h => h.completed).length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const visible = habits.filter(h =>
    filter === "all" ? true : filter === "active" ? !h.completed : h.completed
  );

  return (
    <div className="container">
      <h1 className="title">Трекер ежедневных привычек</h1>

      <div className="add">
        <input
          className="input"
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Добавьте новую привычку..."
          onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
        />
        <button className="btn primary" onClick={handleAdd}>Добавить</button>
      </div>

      <div className="filters">
        <button className="btn" onClick={() => setFilter("all")} disabled={filter === "all"}>Все</button>
        <button className="btn" onClick={() => setFilter("active")} disabled={filter === "active"}>Активные</button>
        <button className="btn" onClick={() => setFilter("completed")} disabled={filter === "completed"}>Выполненные</button>
      </div>

      <ul className="list">
        {visible.map(h => (
          <li key={h.id} className="item">
            <label className="item-left">
              <input
                type="checkbox"
                checked={h.completed}
                onChange={() => toggleCompleted(h.id)}
              />
              <span className={h.completed ? "dht-title-completed" : ""}>{h.title}</span>
            </label>

            <div className="dht-item-actions">
              <button className="btn danger" onClick={() => handleRemove(h.id)}>Удалить</button>
            </div>
          </li>
        ))}

        {visible.length === 0 && <li className="empty">Нет привычек для отображения</li>}
      </ul>

      <div className="stats">
        <div className="counts">
          <strong>Всего:</strong> {totalCount}  <strong>Выполнено:</strong> {completedCount}
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="progress-text">
          Прогресс: {completedCount} / {totalCount} ({progressPercent}%)
        </div>
      </div>
    </div>
  );
}

export default DailyHabitTracker;
