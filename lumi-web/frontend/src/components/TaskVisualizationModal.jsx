// components/TaskVisualizationModal.jsx
import React from "react";

const TaskVisualizationModal = ({ isOpen, onClose, task, date }) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl relative">
        {/* Borda superior colorida */}
        <div
          className="absolute top-0 left-0 w-full h-2 rounded-t-lg"
          style={{ backgroundColor: task.color }}
        />

        <h2 className="text-lg font-bold mb-2 mt-4 text-white">{task.title}</h2>
        <p className="text-sm text-gray-400 mb-4">
          Data: {date.toLocaleDateString("pt-BR")}
        </p>
        <p className="mb-2 text-white">
          <strong>Descrição:</strong> {task.description || "Sem descrição"}
        </p>
        <p className="mb-2 text-white">
          <strong>Duração:</strong> {task.duration} min
        </p>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskVisualizationModal;
