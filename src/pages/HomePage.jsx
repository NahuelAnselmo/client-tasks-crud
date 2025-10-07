import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ButtonLink } from '../components/ui/ButtonLink';
import { FaTasks, FaUserShield, FaRocket } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Footer } from '../components/Footer';

export function HomePage() {
  const { isAuthenticated } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mostrar botón solo al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-white">
      {/* HERO */}
      <section className="text-center py-24 px-6 mt-16 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 shadow-lg">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          Bienvenido a <span className="text-white drop-shadow-lg">Task Manager</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Organiza tus tareas, mantente enfocado y gestiona tu tiempo de forma sencilla y elegante.
        </p>
        {!isAuthenticated ? (
          <div className="flex justify-center gap-4">
            <ButtonLink to="/register" className="bg-indigo-600 hover:bg-indigo-700">
              Comenzar Gratis
            </ButtonLink>
            <ButtonLink to="/login" className="bg-purple-600 hover:bg-purple-700">
              Iniciar Sesión
            </ButtonLink>
          </div>
        ) : (
          <ButtonLink to="/tasks" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-all duration-300">
            Ir a mis Tareas
          </ButtonLink>
        )}
      </section>

      {/* FEATURES */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          Características Principales
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <FaTasks className="text-5xl mx-auto text-blue-400 mb-4" />,
              title: 'Gestión de Tareas',
              text: 'Crea, edita y elimina tus tareas fácilmente. Mantén tu día organizado sin complicaciones.',
              color: 'from-blue-500 to-blue-700',
            },
            {
              icon: <FaUserShield className="text-5xl mx-auto text-green-400 mb-4" />,
              title: 'Seguridad Total',
              text: 'Tu información está protegida con autenticación segura basada en tokens JWT.',
              color: 'from-green-500 to-emerald-600',
            },
            {
              icon: <FaRocket className="text-5xl mx-auto text-purple-400 mb-4" />,
              title: 'Rápido y Responsivo',
              text: 'Diseñado con React y Tailwind para ofrecerte velocidad y fluidez en cualquier dispositivo.',
              color: 'from-purple-500 to-indigo-600',
            },
          ].map(({ icon, title, text, color }, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${color} bg-opacity-80`}
            >
              <div className="bg-zinc-900/80 p-6 rounded-xl">
                {icon}
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-300">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section className="py-20 px-8 bg-zinc-900/70">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Vista Previa del Panel
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-3xl mx-auto">
          Una visión rápida del flujo de tareas y la simplicidad del panel de control.
        </p>
        <div className="max-w-5xl mx-auto rounded-xl shadow-xl overflow-hidden border border-zinc-700">
          <img
            src="https://dummyimage.com/1200x500/1e1e1e/ffffff&text=Vista+de+Tus+Tareas"
            alt="Demo de tareas"
            className="w-full hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
        <h2 className="text-4xl font-bold mb-4">¡Empieza hoy mismo!</h2>
        <p className="text-gray-100 mb-8 text-lg">
          Crea una cuenta gratis y empieza a gestionar tus tareas de forma eficiente y profesional.
        </p>
        {!isAuthenticated ? (
          <ButtonLink
            to="/register"
            className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Registrarse
          </ButtonLink>
        ) : (
          <ButtonLink
            to="/tasks"
            className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Ver mis Tareas
          </ButtonLink>
        )}
      </section>

      {/* BOTÓN FLOTANTE VOLVER ARRIBA */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-60"
          aria-label="Volver arriba"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </div>
  );
}
