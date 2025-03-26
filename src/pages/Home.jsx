import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Hotel, Bed, CheckSquare, AlertTriangle, ArrowUpRight } from "lucide-react";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Sample data for dashboard
  const stats = [
    { 
      title: "Total Rooms", 
      value: 120, 
      icon: <Hotel size={20} />, 
      change: "+2%", 
      color: "bg-blue-500" 
    },
    { 
      title: "Occupied", 
      value: 87, 
      icon: <Bed size={20} />, 
      change: "+5%", 
      color: "bg-green-500" 
    },
    { 
      title: "Reservations", 
      value: 24, 
      icon: <Calendar size={20} />, 
      change: "+12%", 
      color: "bg-purple-500" 
    },
    { 
      title: "Guests", 
      value: 142, 
      icon: <Users size={20} />, 
      change: "+8%", 
      color: "bg-amber-500" 
    },
  ];
  
  const tasks = [
    { id: 1, title: "Check-in: John Smith", room: "201", status: "pending" },
    { id: 2, title: "Check-out: Maria Garcia", room: "305", status: "pending" },
    { id: 3, title: "Room cleaning", room: "118", status: "completed" },
    { id: 4, title: "Maintenance request", room: "412", status: "urgent" },
    { id: 5, title: "VIP arrival preparation", room: "Suite 01", status: "pending" },
  ];
  
  const roomAlerts = [
    { id: 1, room: "207", issue: "Maintenance needed", priority: "high" },
    { id: 2, room: "315", issue: "Cleaning overdue", priority: "medium" },
    { id: 3, room: "122", issue: "AC malfunction", priority: "high" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-1 text-xs text-green-600 dark:text-green-400">
                  <span>{stat.change}</span>
                  <ArrowUpRight size={14} className="ml-1" />
                </div>
              </div>
              <div className={`${stat.color} p-2 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MainFeature />
        </div>
        
        <div className="space-y-6">
          {/* Tasks Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="card"
          >
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
              <h3 className="font-semibold">Today's Tasks</h3>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                {tasks.filter(t => t.status === "pending").length} pending
              </span>
            </div>
            <div className="p-2 max-h-[300px] overflow-y-auto scrollbar-hide">
              <ul className="divide-y divide-surface-200 dark:divide-surface-700">
                {tasks.map((task) => (
                  <li key={task.id} className="p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {task.status === "completed" ? (
                          <CheckSquare size={18} className="text-green-500 mr-2" />
                        ) : task.status === "urgent" ? (
                          <AlertTriangle size={18} className="text-red-500 mr-2" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-surface-400 mr-2"></div>
                        )}
                        <div>
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-surface-500 dark:text-surface-400">Room {task.room}</p>
                        </div>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.status === "completed" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : task.status === "urgent"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Alerts Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="card"
          >
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="font-semibold">Room Alerts</h3>
            </div>
            <div className="p-2">
              <ul className="divide-y divide-surface-200 dark:divide-surface-700">
                {roomAlerts.map((alert) => (
                  <li key={alert.id} className="p-2">
                    <div className="flex items-start">
                      <div className={`mt-0.5 w-2 h-2 rounded-full ${
                        alert.priority === "high" ? "bg-red-500" : "bg-amber-500"
                      } mr-2`}></div>
                      <div>
                        <p className="text-sm font-medium">Room {alert.room}</p>
                        <p className="text-xs text-surface-500 dark:text-surface-400">{alert.issue}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;