import React, { useState } from "react";
import { toast } from "react-toastify";

const TaskCreationModal = ({ isOpen, onClose, onAddEvent, selectedDate, colors }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(30);
    const [color, setColor] = useState("#3b82f6");

    if (!isOpen) return null;

    const handleAdd = (e) => {
        e.preventDefault();
        if (!title.trim()) {
        toast.error("O título é obrigatório!");
        return;
        }
        onAddEvent({ title, description, duration, color });
        toast.success("Atividade criada com sucesso!");
        setTitle("");
        setDescription("");
        setColor("#3b82f6");
        onClose();
    };

   const incrementDuration = () => setDuration((prev) => prev + 30);
   const decrementDuration = () => setDuration((prev) => (prev > 30 ? prev - 30 : prev));


return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Adicionar Atividade</h2>
        <p className="text-sm text-gray-400 mb-4">
          Data: {selectedDate.toLocaleDateString("pt-BR")}
        </p>

        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            placeholder="Título da atividade"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
            autoFocus
          />
          <textarea
            placeholder="Descrição da atividade"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />

          {/* Duração */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-300">Duração:</label>
            <button type="button" onClick={decrementDuration} className="px-2 py-1 bg-gray-600 text-white rounded">
              -
            </button>
            <span className="text-white">{duration}min</span>
            <button type="button" onClick={incrementDuration} className="px-2 py-1 bg-gray-600 text-white rounded">
              +
            </button>
          </div>

          {/* Cores */}
          <div>
            <p className="text-sm text-gray-300 mb-2">Selecione a cor:</p>
            <div className="flex space-x-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    color === c ? "border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {color === c && <span className="text-white text-lg font-bold">✔</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreationModal;
