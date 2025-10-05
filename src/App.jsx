import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { TaskProvider } from './context/tasksContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { Profile } from './pages/Profile';
import Register from './pages/RegisterPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { TasksPage } from './pages/TaskPage';
import { ProtectedRoute } from './ProtectedRoute';
import ContactPage from './pages/ContacPage';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<h1>About Page</h1>} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/add-task" element={<TaskFormPage />} />
                    <Route path="/tasks/:id" element={<TaskFormPage />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
