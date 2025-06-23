import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import ConfirmModal from "../Elements/ConfirmModal";

function TaskCard({ task, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(trimmed);
      setIsEditing(false);
    }
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="bg-white p-2 rounded shadow-sm text-sm border flex flex-col gap-2 animate-fade-in transition-transform transform hover:scale-[1.02]"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {isEditing ? (
              <div>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  className="w-full border px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="mt-2 flex justify-end gap-1 text-xs">
                  <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setEditText(task.text);
                      setIsEditing(false);
                    }}
                    className="px-2 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="break-words break-all whitespace-pre-wrap w-full overflow-hidden">{task.text}</span>
                <div className="flex justify-end gap-2 text-xs">
                  <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700">
                    ✏
                  </button>
                  <button onClick={() => setShowConfirm(true)} className="text-red-500 hover:text-red-700">
                    🗑
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>

      <ConfirmModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={onDelete} />
    </>
  );
}

export default TaskCard;
