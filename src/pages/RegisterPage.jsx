import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isauthenticated, errors: RegisterErrors } = useAuth();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isauthenticated) navigate('/tasks');
  }, [isauthenticated]);

  const onSubmit = handleSubmit(async values => {
    signup(values);
  });

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md mx-auto mt-10'>
      {Array.isArray(RegisterErrors) &&
        RegisterErrors.length > 0 &&
        RegisterErrors.map((errors, index) => (
          <div
            key={index}
            className='bg-red-500 p-2 text-white text-center mb-2'
          >
            {errors}
          </div>
        ))}
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
        {errors.username && (
          <p className='text-red-500'>Username is required</p>
        )}
        <input
          type='email'
          placeholder='Email'
          {...register('email', { required: true })}
          className='w-full mb-2 p-2 border border-gray-300 rounded text-white bg-gray-800'
        />
        {errors.email && <p className='text-red-500'>Email is required</p>}
        <input
          type='password'
          placeholder='Password'
          {...register('password', { required: true })}
          className='w-full mb-2 p-2 border border-gray-300 rounded text-white bg-gray-800'
        />
        {errors.password && (
          <p className='text-red-500'>Password is required</p>
        )}
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
