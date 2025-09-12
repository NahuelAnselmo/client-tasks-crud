import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { signup, user } = useAuth();

  console.log(user);

  const onSubmit = handleSubmit(async values => {
    signup(values);
  });

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md mx-auto mt-10'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col w-full items-center gap-2'
      >
        <h1>RegisterPage</h1>
        <input
          type='text'
          placeholder='Username'
          {...register('username', { required: true })}
          className='w-full mb-2 p-2 border border-gray-300 rounded text-white bg-gray-800'
        />
        <input
          type='email'
          placeholder='Email'
          {...register('email', { required: true })}
          className='w-full mb-2 p-2 border border-gray-300 rounded text-white bg-gray-800'
        />
        <input
          type='password'
          placeholder='Password'
          {...register('password', { required: true })}
          className='w-full mb-2 p-2 border border-gray-300 rounded text-white bg-gray-800'
        />
        <button
          type='submit'
          className='bg-gray-500 text-white p-2 rounded cursor-pointer hover:bg-gray-600 '
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
