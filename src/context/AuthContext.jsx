import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verityTokenRequet } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    } finally {
      setLoading(false);
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
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
