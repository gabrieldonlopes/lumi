import React, { useState } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  isToday,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "lucide-react";

import TaskCreationModal from "../components/TaskCreationModal";
import TaskVisualizationModal from "../components/TaskVisualizationModal";
import Header from "../components/Header";

const TaskPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [creationModalOpen, setCreationModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // MOCK Scoreboard e Achievements (futuramente pode vir da API)
  const scoreboard = [
    { user: "Gdon", points: 85 },
    { user: "Liz", points: 83 },
  ];

  const achievements = [
    { title: "Estudo Java", duration: 50 },
    { title: "Estudo Mat", duration: 30 },
  ];

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const weekStart = startOfWeek(currentDate, { locale: ptBR });
  const weekEnd = endOfWeek(currentDate, { locale: ptBR });
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Navegação
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setCreationModalOpen(true);
  };

  const handleAddEvent = (event) => {
    const eventsOfDay = events.filter((e) => isSameDay(e.date, selectedDate));
    if (eventsOfDay.length >= 5) {
      toast.error("⚡ Máximo de 5 atividades por dia atingido!");
      return;
    }
    setEvents([...events, { ...event, date: selectedDate }]);
  };

  const handleTaskClick = (task, day) => {
    setSelectedTask(task);
    setSelectedDate(day);
    setViewModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 font-sans text-gray-200">
      <ToastContainer position="top-right" autoClose={3000} />

      <Header />

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-200">
            {format(currentDate, "MMMM yyyy", { locale: ptBR })}
          </h1>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gray-300 border rounded-md hover:bg-gray-700"
          >
            Hoje
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            ◀
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 border border-gray-600 rounded-lg overflow-hidden">
        {daysOfWeek.map((day) => (
          <div
            key={day.toString()}
            className="text-center py-2 bg-gray-900 border-r border-gray-700"
          >
            <p className="text-xs text-gray-400 uppercase">
              {format(day, "EEE", { locale: ptBR })}
            </p>
            <p
              className={`text-2xl mt-1 ${
                isToday(day)
                  ? "bg-blue-600 text-white rounded-full w-8 h-8 mx-auto flex items-center justify-center"
                  : ""
              }`}
            >
              {format(day, "d")}
            </p>
          </div>
        ))}

        {daysOfWeek.map((day) => (
          <div
            key={day.toString() + "-events"}
            className="relative h-48 border-t border-r border-gray-700 p-2 cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={() => handleDayClick(day)}
          >
            <div className="flex flex-col space-y-1">
              {events
                .filter((event) => isSameDay(event.date, day))
                .sort((a, b) => a.duration - b.duration)
                .map((event, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskClick(event, day);
                    }}
                    className="text-white text-xs font-semibold rounded-md p-1 truncate shadow-md"
                    style={{ backgroundColor: event.color }}
                    title={event.description}
                  >
                    {event.title} -{" "}
                    {Math.floor(event.duration / 60)}h{" "}
                    {event.duration % 60 !== 0
                      ? `${event.duration % 60}min`
                      : ""}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scoreboard & Achievements */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Scoreboard */}
        <div className="bg-gray-900 rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-bold mb-3">Scoreboard</h2>
          <div className="space-y-2">
            {scoreboard.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-800 p-2 rounded-lg"
              >
                <span className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold">{item.user}</span>
                </span>
                <span className="text-sm text-gray-300">{item.points} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-900 rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-bold mb-3">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((ach, i) => {
              const totals = { "Estudo Java": 120, "Estudo Mat": 150 }; // valores fixos
              const total = totals[ach.title] || 100; // fallback
              const percent = Math.min((ach.duration / total) * 100, 100);

              return (
                <div key={i} className="space-y-1">
                  {/* Título + valor */}
                  <div className="flex justify-between text-sm">
                    <span>{ach.title}</span>
                    <span className="text-gray-400">
                      {ach.duration} / {total} min
                    </span>
                  </div>

                  {/* Barra de progresso */}
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: colors[i % colors.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modais */}
      <TaskCreationModal
        isOpen={creationModalOpen}
        onClose={() => setCreationModalOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
        colors={colors}
      />

      <TaskVisualizationModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        task={selectedTask}
        date={selectedDate}
      />
    </div>
  );
};

export default TaskPage;
