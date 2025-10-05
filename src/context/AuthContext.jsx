import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  verityTokenRequet,
} from '../api/auth';
import { useNotification } from './NotificationContext';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    setLoading(true);
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        notify('¡Registro exitoso!', 'success');
      }
    } catch (error) {
      console.log(error.response.data);

      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
    } finally {
      setLoading(false);
    }
  };
  const signin = async (user) => {
    setLoading(true);
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
      notify('¡Inicio de sesión exitoso!', 'success');
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
      notify('¡Cierre de sesión exitoso!', 'success');
    } catch (error) {
      notify('Ocurrió un error al cerrar sesión', 'error');
      console.log(error);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      setLoading(true);
      try {
        const res = await verityTokenRequet(); // no le paso token
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        loading,
        logout,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
