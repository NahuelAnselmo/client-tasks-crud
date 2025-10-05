import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); 

  const notify = (msg, type = "success") => {
    setMessage(msg);
    setType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {message && (
        <div
          className={`fixed left-1/2 top-16 z-50 px-4 py-2 rounded shadow-lg text-white transition-all
            transform -translate-x-1/2
            ${type === "success" ? "bg-green-600" : ""}
            ${type === "error" ? "bg-red-600" : ""}
            ${type === "info" ? "bg-blue-600" : ""}
          `}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}