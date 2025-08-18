import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopupMessage = ({ type = "success", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  // Professional styles: gold border & dark bg for success, red for error
  const baseClasses = "text-white px-4 py-3 rounded-lg shadow-lg border-2";
  const color =
    type === "success"
      ? "bg-gray-900 border-yellow-400"
      : "bg-red-600 border-red-400";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 60 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 right-6 z-50">
        <div className={`${baseClasses} ${color} flex items-center gap-2`}>
          {type === "success" && (
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-yellow-400">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          <span className="font-medium">{message}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupMessage;
