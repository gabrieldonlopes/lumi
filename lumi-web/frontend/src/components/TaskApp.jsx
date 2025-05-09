import { useState, useEffect } from 'react';
import api from "../api.js";

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    duration: '',
  });

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks`);
      setTasks(response.data._embedded.taskList);
    } catch (error) {
      console.error('Error fetching tasks', error);
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
      setNewTask({ title: '', description: '', duration: '' });
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const handleDeleteTask = async (id_task) => {
    try {
      await api.delete(`/tasks/${id_task}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div id="root">
      <h1>Lumi Web</h1>

      <form onSubmit={handleAddTask}>
        <input type="text" name="title" value={newTask.title} onChange={handleInputChange} placeholder="Title" />
        <input type="text" name="description" value={newTask.description} onChange={handleInputChange} placeholder="Description" />
        <input type="text" name="duration" value={newTask.duration} onChange={handleInputChange} placeholder="Duration" />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id_task}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.duration}</p>
            <button onClick={() => handleDeleteTask(task.id_task)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskApp;
