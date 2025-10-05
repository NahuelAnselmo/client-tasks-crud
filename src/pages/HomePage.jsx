import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ButtonLink } from '../components/ui/ButtonLink';
import { FaTasks, FaUserShield, FaRocket } from 'react-icons/fa';
import { Footer } from '../components/Footer';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 min-h-screen text-white">
      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4">
          Bienvenido a Task Manager
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Organiza tus tareas, mantente enfocado y gestiona tu tiempo de forma
          sencilla.
        </p>
        {!isAuthenticated ? (
          <div className="flex justify-center gap-4">
            <ButtonLink to="/register">Comenzar Gratis</ButtonLink>
            <ButtonLink to="/login">Iniciar Sesión</ButtonLink>
          </div>
        ) : (
          <ButtonLink to="/tasks">Ir a mis Tareas</ButtonLink>
        )}
      </section>

      {/* FEATURES */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Características
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform">
            <FaTasks className="text-4xl mx-auto text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gestión de Tareas</h3>
            <p className="text-gray-400">
              Crea, edita y elimina tus tareas fácilmente para mantener todo
              bajo control.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform">
            <FaUserShield className="text-4xl mx-auto text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seguridad</h3>
            <p className="text-gray-400">
              Autenticación segura con tokens y protección de datos.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform">
            <FaRocket className="text-4xl mx-auto text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rápido y Responsivo</h3>
            <p className="text-gray-400">
              Diseñado con React y Tailwind, se adapta a cualquier dispositivo.
            </p>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section className="py-16 px-8 bg-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-8">Vista Previa</h2>
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://dummyimage.com/900x400/1e1e1e/ffffff&text=Vista+de+Tus+Tareas"
            alt="Demo de tareas"
            className="w-full"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">¡Empieza hoy mismo!</h2>
        <p className="text-gray-300 mb-6">
          Únete gratis y comienza a gestionar tus tareas de forma eficiente.
        </p>
        {!isAuthenticated ? (
          <ButtonLink to="/register">Registrarse</ButtonLink>
        ) : (
          <ButtonLink to="/tasks">Ver mis Tareas</ButtonLink>
        )}
      </section>

      {/* FOOTER */}
      <Footer/>
    </div>
  );
}
