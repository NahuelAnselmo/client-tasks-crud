import { createContext, useContext, useState } from 'react';
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from '../api/tasks';
import { useNotification } from '../context/NotificationContext';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { notify } = useNotification();

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) {
        setTasks(tasks.filter((task) => task._id !== id));
        notify('¡Tarea borrada!', 'info');
      }
    } catch (error) {
      notify('Error al borrar la tarea', 'error');
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      setTasks([...tasks, res.data]);
      notify('¡Tarea creada exitosamente!', 'success');
    } catch (error) {
      notify('Error al crear la tarea', 'error');
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      notify('Error al obtener la tarea', 'error');
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
      notify('¡Tarea actualizada!', 'success');
    } catch (error) {
      notify('Error al actualizar la tarea', 'error');
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
