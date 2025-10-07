import { useEffect } from 'react';
import { ImFileEmpty } from 'react-icons/im';
import { TaskCard } from '../components/tasks/TasksCard';
import { useTasks } from '../context/tasksContext';

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10 mt-20 min-h-[100vh]">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <div className="grid gap-6 px-2 pb-24 pt-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-22">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}
