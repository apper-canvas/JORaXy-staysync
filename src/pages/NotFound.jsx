import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full text-center px-4"
    >
      <div className="w-24 h-24 mb-6 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
        <span className="text-4xl font-bold">404</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="btn-primary"
      >
        <Home size={18} className="mr-2" />
        Back to Dashboard
      </Link>
    </motion.div>
  );
};

export default NotFound;