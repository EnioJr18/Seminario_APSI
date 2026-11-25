"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Task } from "@/lib/tasks";

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (title: string, category: Task["category"]) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
};
const TasksContext = createContext<TasksContextType | null>(null);

// PATTERN 3: Provider — compartilha ações e estado sem prop drilling.
export function TasksProvider({ children }: { children: ReactNode }) {
  // PATTERN 2: Observer (analogia) — alterações de estado atualizam a UI.
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => {
        if (!response.ok) throw new Error("Falha na API");
        return response.json() as Promise<Task[]>;
      })
      .then((data) => setTasks(data))
      .catch(() => setError("Não foi possível buscar as tarefas."))
      .finally(() => setLoading(false));
  }, []);
  const addTask = useCallback((title: string, category: Task["category"]) => {
    setTasks((current) => [
      { id: crypto.randomUUID(), title, category, completed: false },
      ...current,
    ]);
  }, []);
  const toggleTask = useCallback((id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);
  const removeTask = useCallback((id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  }, []);
  return (
    <TasksContext.Provider
      value={{ tasks, loading, error, addTask, toggleTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
export function useTasks() {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error("useTasks deve ser usado dentro de TasksProvider");
  return context;
}
