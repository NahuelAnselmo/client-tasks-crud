import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest } from '../api/auth';

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
  const [isauthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  const signup = async user => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);

      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]); // 👈 siempre guardamos un array
      }
    }
  };
  const signin = async user => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    const cookies = Cookies.get('session_id');
    if (cookies.token) {
      setIsAuthenticated(true);
      // Aquí podríamos hacer una petición para obtener los datos del usuario
      // y setear el estado de user
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isauthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
