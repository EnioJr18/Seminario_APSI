"use client";
import type { Task } from "@/lib/tasks";
import { useTasks } from "@/context/TasksContext";
export function TaskCard({ task }: { task: Task }) {
  const { toggleTask, removeTask } = useTasks();
  return (
    <li className={`task ${task.completed ? "done" : ""}`}>
      <button
        className="check"
        onClick={() => toggleTask(task.id)}
        aria-label={`Alternar ${task.title}`}
      >
        {task.completed ? "✓" : ""}
      </button>
      <div className="task-info">
        <strong>{task.title}</strong>
        <small>{task.category}</small>
      </div>
      <button
        className="delete"
        onClick={() => removeTask(task.id)}
        aria-label={`Excluir ${task.title}`}
      >
        ×
      </button>
    </li>
  );
}
