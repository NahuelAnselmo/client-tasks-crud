import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { Profile } from './pages/Profile';
import Register from './pages/RegisterPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { TaskPage } from './pages/TaskPage';
import { ProtectedRoute } from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<h1>About Page</h1>} />
          <Route path='/contact' element={<h1>Contact Page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/tasks' element={<TaskPage />} />
            <Route path='/add-task' element={<TaskFormPage />} />
            <Route path='/tasks/:id' element={<TaskFormPage />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
