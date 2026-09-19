import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, NotebookTabs, LogOut, Tags, Moon, Sun } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const MobileNav = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-6 h-6" /> },
  ];

  if (isLoggedIn) {
    navItems.push({ name: 'Add', path: '/new', icon: <PlusCircle className="w-6 h-6" /> });
    navItems.push({ name: 'Categories', path: '/categories', icon: <Tags className="w-6 h-6" /> });
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center p-3 z-50">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`
          }
        >
          {item.icon}
          <span className="text-[10px] font-medium">{item.name}</span>
        </NavLink>
      ))}
      
      <button
        onClick={toggleTheme}
        className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        <span className="text-[10px] font-medium">Theme</span>
      </button>

      {isLoggedIn && (
        <button
          onClick={logout}
          className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors text-red-500 hover:text-red-600"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      )}
    </nav>
  );
};

export default MobileNav;
