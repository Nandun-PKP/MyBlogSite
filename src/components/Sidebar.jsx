import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, PlusCircle, NotebookTabs, LogOut, Sun, Moon, Tags } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Sidebar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const mainNavItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'My Notes', path: '/', icon: <NotebookTabs className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col hidden md:flex">
      <div className="p-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">DevNotes</h1>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {mainNavItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                isActive && item.name === 'Home'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

        {isLoggedIn && (
          <>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700'
                }`
              }
            >
              <PlusCircle className="w-5 h-5" />
              Add New Note
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`
              }
            >
              <Tags className="w-5 h-5" />
              Manage Categories
            </NavLink>
          </>
        )}
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        {isLoggedIn && (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
        <div className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2">
          &copy; {new Date().getFullYear()} DevNotes
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
