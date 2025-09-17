import { useForm } from 'react-hook-form';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(data => {
    // Handle login logic here
    console.log(data);
  });

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md mx-auto mt-10'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col w-full items-center gap-2'
      >
        <h1>Login</h1>
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
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginPage;
