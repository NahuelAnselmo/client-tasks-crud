import { createContext, useContext, useState } from 'react';
import { registerRequest } from '../api/auth';

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

  const signup = async user => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const msg = error.response.data.message;
        setErrors(Array.isArray(msg) ? msg : [msg]);
      } else {
        setErrors(['An unexpected error occurred. Please try again later.']);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isauthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
