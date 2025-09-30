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
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={handleDelete}>Delete</Button>
          <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
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
