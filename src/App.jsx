import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path='/about' element={<h1>About Page</h1>} />
          <Route path='/contact' element={<h1>Contact Page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/tasks' element={<h1>Tasks Page</h1>} />
          <Route path='/add-task' element={<h1>Add Task Page</h1>} />
          <Route path='/tasks/:id' element={<h1>Task Details Page</h1>} />
          <Route path='/profile' element={<h1>Profile Page</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
