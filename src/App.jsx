import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Sun, Moon, Menu, X, Hotel, Calendar, Users, Clipboard, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || 
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { name: "Dashboard", icon: <Hotel size={20} />, path: "/" },
    { name: "Reservations", icon: <Calendar size={20} />, path: "/reservations" },
    { name: "Guests", icon: <Users size={20} />, path: "/guests" },
    { name: "Reports", icon: <Clipboard size={20} />, path: "/reports" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-900/50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 flex flex-col glass lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        initial={false}
      >
        <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
              S
            </div>
            <h1 className="text-xl font-bold">StaySync</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden rounded-md p-1 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="flex items-center px-3 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 group transition-colors"
                >
                  <span className="mr-3 text-surface-500 group-hover:text-primary dark:text-surface-400 dark:group-hover:text-primary-light transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-surface-300 dark:bg-surface-600"></div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">Hotel Manager</p>
              </div>
            </div>
            <button className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden mr-2 rounded-md p-1 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;