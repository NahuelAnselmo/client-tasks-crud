import { useAuth } from '../context/AuthContext';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto text-white text-center mt-25">
      <h2 className="text-3xl font-bold mb-4">Perfil de Usuario</h2>
      <div className="bg-zinc-700 p-4 rounded-lg shadow-md">
        <p>
          <strong>Usuario:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};
