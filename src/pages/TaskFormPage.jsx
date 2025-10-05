import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Input, Label } from '../components/ui';
import { Textarea } from '../components/ui/Textarea';
import { useNotification } from '../context/NotificationContext';
import { useTasks } from '../context/tasksContext';
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id && params.id !== 'new') {
        if (!params.id.match(/^[a-f\d]{24}$/i)) {
          notify('ID de tarea inválido', 'error');
          return;
        }
        await updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
        notify('¡Tarea actualizada exitosamente!', 'success');
      } else {
        await createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
        notify('¡Tarea creada exitosamente!', 'success');
        reset();
      }
    } catch (error) {
      notify('Ocurrió un error', 'error');
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id && params.id !== 'new') {
        const task = await getTask(params.id);
        if (!task) return;
        setValue('title', task.title || '');
        setValue('description', task.description || '');
        setValue(
          'date',
          task.date ? dayjs(task.date).utc().format('YYYY-MM-DD') : '',
        );
        setValue('completed', task.completed || false);
      }
    };
    loadTask();
  }, []);

  console.log('params.id:', params.id);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            {...register('title', { required: 'Title is required' })}
            autoFocus
            className="border border-zinc-600 bg-zinc-900 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title.message}</p>
          )}

          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Description"
            {...register('description', { required: 'Description is required' })}
            className="border border-zinc-600 bg-zinc-900 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          ></Textarea>
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description.message}</p>
          )}

          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            name="date"
            {...register('date', { required: 'Date is required' })}
            className="border border-zinc-600 bg-zinc-900 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.date && (
            <p className="text-red-500 text-xs italic">{errors.date.message}</p>
          )}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition mt-4">
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
}
