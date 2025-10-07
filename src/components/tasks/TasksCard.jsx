import { useTasks } from '../../context/tasksContext';
import { Button, ButtonLink, Card } from '../ui';
import { useNotification } from '../../context/NotificationContext';
import { FaRegCalendarAlt } from 'react-icons/fa';

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const { notify } = useNotification();

  const handleDelete = async () => {
    await deleteTask(task._id);
    notify('¡Tarea borrada!', 'info');
  };

  return (
    <Card>
      <header className="flex justify-between items-start gap-2 flex-wrap mb-2">
        <h1 className="text-xl font-bold break-words max-w-[65%] text-white">
          {task.title}
        </h1>
        <div className="flex gap-2 items-center flex-shrink-0">
          <Button
            onClick={handleDelete}
            size="sm"
            className="bg-red-600 hover:bg-red-700 transition-colors"
          >
            Delete
          </Button>
          <ButtonLink
            to={`/tasks/${task._id}`}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Edit
          </ButtonLink>
        </div>
      </header>

      <p className="text-slate-300 break-words break-all mb-4 min-h-[2.5rem]">
        {task.description || <span className="italic text-gray-500">No description</span>}
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-400 mt-auto">
        <FaRegCalendarAlt className="text-lg" />
        <span>
          {task.date
            ? new Date(task.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'No date'}
        </span>
      </div>
    </Card>
  );
}
