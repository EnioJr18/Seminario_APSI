"use client";
import { useState, type FormEvent } from "react";
import { useTasks } from "@/context/TasksContext";
import type { Task } from "@/lib/tasks";
import { TaskCard } from "./TaskCard";

// PATTERN 1: Composite — TaskBoard → TaskList → TaskCard.
function TaskList({ tasks }: { tasks: Task[] }) {
  if (!tasks.length)
    return <div className="empty">Nenhuma tarefa neste filtro.</div>;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ul>
  );
}
function TaskStats() {
  const { tasks } = useTasks();
  const done = tasks.filter((task) => task.completed).length;
  return (
    <div className="stats">
      <div>
        <span>Total</span>
        <b>{tasks.length}</b>
      </div>
      <div>
        <span>Concluídas</span>
        <b>{done}</b>
      </div>
      <div>
        <span>Em aberto</span>
        <b>{tasks.length - done}</b>
      </div>
    </div>
  );
}
export function TaskBoard() {
  const { tasks, loading, error, addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Task["category"]>("Estudo");
  const [filter, setFilter] = useState<"Todas" | "Pendentes" | "Concluídas">(
    "Todas",
  );
  const visible = tasks.filter(
    (t) =>
      filter === "Todas" ||
      (filter === "Pendentes" ? !t.completed : t.completed),
  );
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim(), category);
    setTitle("");
  };
  return (
    <main className="container">
      <header>
        <div className="brand">
          <div className="logo">⚛</div>
          <span>
            Task<span className="blue">Flow</span>
          </span>
        </div>
        <span className="course">IFAL • React + Next.js</span>
      </header>
      <section className="hero">
        <div className="pill">PROVA DE CONCEITO • DESIGN PATTERNS</div>
        <h1>
          Organize suas ideias.
          <br />
          <em>Entenda o React.</em>
        </h1>
        <p>
          Adicione, conclua e filtre tarefas. Cada interação demonstra conceitos
          reais do framework.
        </p>
      </section>
      <TaskStats />
      <section className="workspace">
        <div className="workspace-heading">
          <div>
            <h2>Minhas tarefas</h2>
            <p>Componentes reutilizáveis + Context API + estado reativo</p>
          </div>
          <span className="live-dot">● Interface reativa</span>
        </div>
        <form className="add-form" onSubmit={submit}>
          <input
            aria-label="Nome da tarefa"
            placeholder="O que você precisa fazer?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
          <select
            aria-label="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value as Task["category"])}
          >
            <option>Estudo</option>
            <option>Projeto</option>
            <option>Pessoal</option>
          </select>
          <button type="submit">+ Nova tarefa</button>
        </form>
        <div className="filters">
          {(["Todas", "Pendentes", "Concluídas"] as const).map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={filter === value ? "selected" : ""}
            >
              {value}
            </button>
          ))}
        </div>
        {loading ? (
          <p className="message">Carregando GET /api/tasks...</p>
        ) : error ? (
          <p role="alert" className="message">
            {error}
          </p>
        ) : (
          <TaskList tasks={visible} />
        )}
      </section>
      <footer>
        Composite • Observer / estado reativo • Provider / Context API{" "}
        <span>Dados temporários, sem banco de dados</span>
      </footer>
    </main>
  );
}
