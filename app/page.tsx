import { TaskBoard } from "@/components/TaskBoard";
import { TasksProvider } from "@/context/TasksContext";
export default function HomePage() {
  return (
    <TasksProvider>
      <TaskBoard />
    </TasksProvider>
  );
}
