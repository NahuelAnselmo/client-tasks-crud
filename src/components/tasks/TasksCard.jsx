import { useTasks } from '../../context/tasksContext';
import { Button, ButtonLink, Card } from '../ui';
import { useNotification } from '../../context/NotificationContext';

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const { notify } = useNotification();

  const handleDelete = async () => {
    await deleteTask(task._id);
    notify('¡Tarea borrada!', 'info');
  };

  return (
    <Card>
      <header className="flex justify-between items-start gap-2 flex-wrap">
        <h1 className="text-xl font-bold break-words max-w-[60%]">
          {task.title}
        </h1>
        <div className="flex gap-2 items-center flex-shrink-0">
          <Button onClick={handleDelete} size="sm">
            Delete
          </Button>
          <ButtonLink to={`/tasks/${task._id}`} size="sm">
            Edit
          </ButtonLink>
        </div>
      </header>

      <p className="text-slate-300">{task.description}</p>
      {/* format date */}
      <p>
        {task.date &&
          new Date(task.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </p>
    </Card>
  );
}
