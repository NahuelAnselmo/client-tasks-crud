import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ButtonLink } from './ui/ButtonLink';
import { Menu, X, User, ChevronDown } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Cerrar dropdown si clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const commonLinks = [
    { to: '/', label: 'Home' },
    { to: '/contact', label: 'Contacto' },
  ];
  const authLinks = [
    { to: '/tasks', label: 'Mis Tareas' },
    { to: '/add-task', label: 'Nueva Tarea' },
  ];

  return (
    <nav className="bg-zinc-800/80 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-[60] transition-all">
      <div className="flex justify-between items-center py-3 px-4 sm:px-6 max-w-6xl mx-auto relative">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight hover:scale-105 transition-transform">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Task Manager
          </Link>
        </h1>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden p-2 rounded hover:bg-zinc-700 transition"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links desktop */}
        <ul className="hidden md:flex gap-x-6 items-center">
          {commonLinks.map((link) => (
            <li key={link.to} className="flex items-center">
              <Link
                to={link.to}
                className="relative font-medium text-white hover:text-indigo-400 transition-colors
                after:content-[''] after:block after:h-[2px] after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {isAuthenticated ? (
            <>
              {authLinks.map((link) => (
                <li key={link.to} className="flex items-center">
                  <ButtonLink
                    to={link.to}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-md hover:scale-105 transition-all duration-200 font-semibold"
                  >
                    {link.label}
                  </ButtonLink>
                </li>
              ))}

              {/* Perfil con hover + clic */}
              <li
                ref={profileMenuRef}
                className="relative flex items-center"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 cursor-pointer select-none hover:text-indigo-400 transition-colors"
                >
                  <span className="font-semibold">{user.username}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      profileOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-indigo-400 shadow"
                    />
                  ) : (
                    <span className="bg-indigo-600 w-8 h-8 flex items-center justify-center rounded-full text-white shadow">
                      <User size={16} />
                    </span>
                  )}
                </button>

                {/* Dropdown perfectamente alineado */}
                <ul
                  className={`absolute top-full right-0 mt-2 backdrop-blur-md bg-zinc-800/90 border border-zinc-700/50 
                  text-sm rounded-xl shadow-lg w-44 z-[70] transform transition-all duration-300 origin-top 
                  overflow-hidden ${
                    profileOpen
                      ? 'opacity-100 translate-y-0 visible'
                      : 'opacity-0 -translate-y-2 invisible'
                  }`}
                >
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-indigo-500/40 text-white transition-all duration-200"
                    >
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-500/60 text-white transition-all duration-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center">
                <ButtonLink
                  to="/login"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-md hover:scale-105 transition-all duration-200 font-semibold"
                >
                  Login
                </ButtonLink>
              </li>
              <li className="flex items-center">
                <ButtonLink
                  to="/register"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 shadow-md hover:scale-105 transition-all duration-200 font-semibold"
                >
                  Register
                </ButtonLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full bg-zinc-900/95 border-t border-zinc-700 shadow-lg z-[80] animate-fade-in"
        >
          <ul className="flex flex-col gap-3 p-4">
            {commonLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block py-2 px-4 rounded font-medium text-white hover:bg-indigo-600 hover:text-white transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isAuthenticated ? (
              <>
                {authLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="block py-2 px-4 rounded font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-md hover:scale-105 transition-all duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 rounded font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 shadow-md hover:scale-105 transition-all duration-200"
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
                    className="block py-2 px-4 rounded font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-md hover:scale-105 transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-4 rounded font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 shadow-md hover:scale-105 transition-all duration-200"
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
