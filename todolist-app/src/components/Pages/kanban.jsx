import { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "../Fragments/KanbanColumn";

const initialData = {
  backlog: [],
  todo: [],
  inProgress: [],
  review: [],
  done: [],
  blocked: [],
};

const STATUS_ORDER = ["backlog", "todo", "inProgress", "review", "done", "blocked"];

const Kanban = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanban-tasks");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      const newItems = Array.from(tasks[sourceCol]);
      const [moved] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, moved);
      setTasks({ ...tasks, [sourceCol]: newItems });
    } else {
      const sourceItems = Array.from(tasks[sourceCol]);
      const destItems = Array.from(tasks[destCol]);
      const [moved] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, moved);
      setTasks({
        ...tasks,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      });
    }
  };

  const addTask = (status, text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
    };
    setTasks({
      ...tasks,
      [status]: [...tasks[status], newTask],
    });
  };

  const deleteTask = (status, id) => {
    setTasks({
      ...tasks,
      [status]: tasks[status].filter((t) => t.id !== id),
    });
  };

  const editTask = (status, id, newText) => {
    setTasks({
      ...tasks,
      [status]: tasks[status].map((t) => (t.id === id ? { ...t, text: newText } : t)),
    });
  };

  return (
    <DashboardLayout title="📋 Kanban Board">
      <div className="h-full w-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto">
            <div className="flex gap-4 ">
              {STATUS_ORDER.map((status) => (
                <KanbanColumn key={status} status={status} tasks={tasks[status]} onAddTask={addTask} onDeleteTask={deleteTask} onEditTask={editTask} />
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>
    </DashboardLayout>
  );
};

export default Kanban;
