import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ButtonLink } from './ui/ButtonLink';
import { Menu, X } from 'lucide-react'; // íconos hamburguesa y cerrar

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-zinc-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center py-4 px-6 max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/tasks" onClick={() => setMenuOpen(false)}>
            Task Manager
          </Link>
        </h1>

        {/* Botón hamburguesa (solo visible en pantallas pequeñas) */}
        <button
          className="md:hidden p-2 rounded hover:bg-zinc-700 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links - versión desktop */}
        <ul className="hidden md:flex gap-x-6 items-center">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contacto
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <ButtonLink to="/tasks">Mis Tareas</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/add-task">Nueva Tarea</ButtonLink>
              </li>

              {/* Dropdown perfil */}
              <li className="relative group">
                <button className="flex items-center gap-2">
                  <span className="font-semibold">{user.username}</span>
                  <span className="bg-zinc-600 px-2 py-1 rounded-full">
                    {user.username[0].toUpperCase()}
                  </span>
                </button>

                <ul className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:flex flex-col right-0 mt-2 bg-zinc-700 text-sm rounded shadow-lg w-40 z-50">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-zinc-600"
                    >
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink to="/login">Login</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Menú móvil */}
      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-t border-zinc-700 shadow-lg z-50">
          <ul className="flex flex-col gap-3 p-4">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-zinc-700 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-4 hover:bg-zinc-700 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/tasks"
                    className="block py-2 px-4 hover:bg-zinc-700 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mis Tareas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-task"
                    className="block py-2 px-4 hover:bg-zinc-700 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Nueva Tarea
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 px-4 hover:bg-zinc-700 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 hover:bg-zinc-700 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-4 hover:bg-zinc-700 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-4 hover:bg-zinc-700 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
