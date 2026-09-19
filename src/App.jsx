import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Home from './components/Home';
import NoteViewer from './components/NoteViewer';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import ManageCategories from './components/ManageCategories';
import Login from './components/Login';
import { NoteProvider } from './context/NoteContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NoteProvider>
          <BrowserRouter>
            <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto w-full pb-20 md:pb-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/note/:id" element={<NoteViewer />} />
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/new" 
                    element={<ProtectedRoute><AddNote /></ProtectedRoute>} 
                  />
                  <Route 
                    path="/edit/:id" 
                    element={<ProtectedRoute><EditNote /></ProtectedRoute>} 
                  />
                  <Route 
                    path="/categories" 
                    element={<ProtectedRoute><ManageCategories /></ProtectedRoute>} 
                  />
                </Routes>
              </main>
              <MobileNav />
            </div>
          </BrowserRouter>
        </NoteProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
