import { useState, useEffect } from 'react';
import api from "../api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    duration: '',
    localDateTime: '',
  });

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks`);
      setTasks(response.data._embedded.taskList);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Erro desconhecido");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault(); // Para evitar o reload da página
    try {
      await api.post(`/tasks`, newTask);
      fetchTasks();
      setNewTask({ title: '', description: '', duration: '', localDate: '' });
      toast.success("Tarefa adicionada com sucesso")
    } catch (error) {
      if (error.response?.status === 400 && typeof error.response.data === "object") {
      Object.values(error.response.data).forEach(msg => { // mostra cada mensagem de erro
        toast.error(msg);
      });
      } else {
        toast.error(error.response?.data?.message || "Erro ao adicionar tarefa");
      }
    }
  };

  const handleDeleteTask = async (id_task) => {
    try {
      await api.delete(`/tasks/${id_task}`);
      toast.sucess("Tarefa excluída com sucesso")
      fetchTasks();
    } catch (error) {
      toast.error('Error deleting task', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
    <ToastContainer autoClose={3000} />
    <div id="root">
      <h1>Lumi Web</h1>

      <form onSubmit={handleAddTask}>
        <input type="text" name="title" value={newTask.title} onChange={handleInputChange} placeholder="Title" />
        <input type="text" name="description" value={newTask.description} onChange={handleInputChange} placeholder="Description" />
        <input type="text" name="duration" value={newTask.duration} onChange={handleInputChange} placeholder="Duration" />
        <input type="datetime-local" name="localDateTime" value={newTask.localDateTime} onChange={handleInputChange} placeholder="LocalDate" />
        <button type="submit">Add Task</button>
      </form> 

      <ul>
        {tasks.map((task) => (
          <li key={task.id_task}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.duration}</p>
            <p>{task.localDateTime}</p>
            <button onClick={() => handleDeleteTask(task.id_task)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default TaskApp;
