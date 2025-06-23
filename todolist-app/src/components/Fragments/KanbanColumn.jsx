import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { useState } from "react";

const statusLabels = {
  backlog: "📌 Backlog",
  todo: "📝 To Do",
  inProgress: "⚙ In Progress",
  review: "🔍 Review",
  done: "✅ Done",
  blocked: "⛔ Blocked",
};

const statusColors = {
  backlog: "bg-gray-200",
  todo: "bg-blue-100",
  inProgress: "bg-amber-100",
  review: "bg-purple-100",
  done: "bg-green-100",
  blocked: "bg-red-100",
};

function KanbanColumn({ status, tasks, onAddTask, onDeleteTask, onEditTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (newTask.trim()) {
      onAddTask(status, newTask);
      setNewTask("");
    }
  };

  return (
    <div className={`rounded-lg shadow flex flex-col h-full p-3 w-[280px] sm:w-[320px] md:w-auto flex-shrink-0 ${statusColors[status]}`}>
      <h2 className="text-md font-semibold mb-3 text-center uppercase tracking-wide text-gray-800">{statusLabels[status]}</h2>

      <Droppable droppableId={status}>
        {(provided) => (
          <div className="flex-1 space-y-2 min-h-[100px] pr-1" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onDelete={() => onDeleteTask(status, task.id)} onEdit={(newText) => onEditTask(status, task.id, newText)} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Input Task */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder="Tambah task..."
          className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={handleAdd} className="shrink-0 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Add
        </button>
      </div>
    </div>
  );
}
export default KanbanColumn;
