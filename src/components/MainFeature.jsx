import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, Bed, Search, Plus, X, Check, AlertCircle } from "lucide-react";

const MainFeature = () => {
  // State for room booking form
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    specialRequests: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Sample room types
  const roomTypes = [
    { id: "standard", name: "Standard Room", price: 99, available: 15 },
    { id: "deluxe", name: "Deluxe Room", price: 149, available: 8 },
    { id: "suite", name: "Executive Suite", price: 249, available: 3 },
    { id: "family", name: "Family Room", price: 189, available: 5 }
  ];
  
  // Recent bookings data
  const recentBookings = [
    { id: 1, guest: "Emma Thompson", room: "301 - Deluxe", checkIn: "2023-06-15", checkOut: "2023-06-18", status: "checked-in" },
    { id: 2, guest: "Michael Chen", room: "212 - Standard", checkIn: "2023-06-16", checkOut: "2023-06-20", status: "confirmed" },
    { id: 3, guest: "Sophia Rodriguez", room: "105 - Family", checkIn: "2023-06-14", checkOut: "2023-06-21", status: "checked-in" },
    { id: 4, guest: "James Wilson", room: "401 - Suite", checkIn: "2023-06-17", checkOut: "2023-06-19", status: "confirmed" }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.guestName.trim()) {
      newErrors.guestName = "Guest name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.roomType) {
      newErrors.roomType = "Please select a room type";
    }
    
    if (!formData.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    }
    
    if (!formData.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    } else if (formData.checkIn && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = "Check-out date must be after check-in date";
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setShowForm(false);
        setFormData({
          guestName: "",
          email: "",
          phone: "",
          roomType: "",
          checkIn: "",
          checkOut: "",
          adults: 1,
          children: 0,
          specialRequests: ""
        });
      }, 2000);
    }, 1500);
  };
  
  const toggleForm = () => {
    setShowForm(!showForm);
    if (showSuccess) setShowSuccess(false);
    if (Object.keys(errors).length > 0) setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
        <h3 className="font-semibold flex items-center">
          <Calendar size={18} className="mr-2 text-primary" />
          Reservation Management
        </h3>
        <button
          onClick={toggleForm}
          className={`btn ${showForm ? 'btn-outline' : 'btn-primary'} text-sm py-1.5`}
        >
          {showForm ? (
            <>
              <X size={16} className="mr-1.5" />
              Cancel
            </>
          ) : (
            <>
              <Plus size={16} className="mr-1.5" />
              New Booking
            </>
          )}
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4">
              <AnimatePresence>
                {showSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-4 flex items-center text-green-800 dark:text-green-400"
                  >
                    <Check size={20} className="mr-2" />
                    <span>Booking successfully created!</span>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="guestName" className="label">Guest Name</label>
                        <input
                          type="text"
                          id="guestName"
                          name="guestName"
                          value={formData.guestName}
                          onChange={handleChange}
                          className={`input ${errors.guestName ? 'border-red-500 dark:border-red-500' : ''}`}
                          placeholder="Enter guest name"
                        />
                        {errors.guestName && (
                          <p className="mt-1 text-xs text-red-500">{errors.guestName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="label">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`input ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="label">Phone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`input ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                          placeholder="Enter phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="roomType" className="label">Room Type</label>
                        <select
                          id="roomType"
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          className={`input ${errors.roomType ? 'border-red-500 dark:border-red-500' : ''}`}
                        >
                          <option value="">Select room type</option>
                          {roomTypes.map(room => (
                            <option key={room.id} value={room.id}>
                              {room.name} - ${room.price}/night ({room.available} available)
                            </option>
                          ))}
                        </select>
                        {errors.roomType && (
                          <p className="mt-1 text-xs text-red-500">{errors.roomType}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="checkIn" className="label">Check-in Date</label>
                        <input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          className={`input ${errors.checkIn ? 'border-red-500 dark:border-red-500' : ''}`}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.checkIn && (
                          <p className="mt-1 text-xs text-red-500">{errors.checkIn}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="checkOut" className="label">Check-out Date</label>
                        <input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          className={`input ${errors.checkOut ? 'border-red-500 dark:border-red-500' : ''}`}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        />
                        {errors.checkOut && (
                          <p className="mt-1 text-xs text-red-500">{errors.checkOut}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="adults" className="label">Adults</label>
                        <input
                          type="number"
                          id="adults"
                          name="adults"
                          value={formData.adults}
                          onChange={handleChange}
                          min="1"
                          max="10"
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="children" className="label">Children</label>
                        <input
                          type="number"
                          id="children"
                          name="children"
                          value={formData.children}
                          onChange={handleChange}
                          min="0"
                          max="10"
                          className="input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="specialRequests" className="label">Special Requests</label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="3"
                        className="input"
                        placeholder="Enter any special requests or notes"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Create Booking"
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="bookings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-surface-600 dark:text-surface-400">Recent Bookings</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-8 pr-4 py-1.5 text-sm rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-surface-500" />
                </div>
              </div>
              
              <div className="overflow-x-auto -mx-4 px-4">
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Guest</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Room</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Check-in</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Check-out</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                        <td className="px-3 py-3 whitespace-nowrap text-sm">{booking.guest}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm">{booking.room}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm flex items-center">
                          <Calendar size={14} className="mr-1.5 text-surface-500" />
                          {booking.checkIn}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm flex items-center">
                          <Calendar size={14} className="mr-1.5 text-surface-500" />
                          {booking.checkOut}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === "checked-in" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}>
                            {booking.status === "checked-in" ? (
                              <Check size={12} className="mr-1" />
                            ) : (
                              <Clock size={12} className="mr-1" />
                            )}
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center text-sm text-surface-500 dark:text-surface-400">
                <div>
                  Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
                </div>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 rounded border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="px-2 py-1 rounded border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 disabled:opacity-50" disabled>
                    Next
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 rounded-b-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <AlertCircle size={16} className="mr-2 text-amber-500" />
                  <span className="text-surface-600 dark:text-surface-400">
                    Room availability is updated in real-time
                  </span>
                </div>
                <button className="text-primary hover:text-primary-dark text-sm font-medium">
                  View All Bookings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MainFeature;