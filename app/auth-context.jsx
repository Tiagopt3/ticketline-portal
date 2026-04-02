import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const SESSION_TIMEOUT = 1 * 60 * 1000; // 20 minutes in milliseconds

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedExpiry = localStorage.getItem("sessionExpiry");
    
    if (storedUser && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      const now = Date.now();
      
      // Check if session has expired
      if (now > expiryTime) {
        localStorage.removeItem("user");
        localStorage.removeItem("sessionExpiry");
      } else {
        setUser(JSON.parse(storedUser));
        setSessionExpiry(expiryTime);
      }
    }
    setIsLoading(false);
  }, []);

  // Check session expiry periodically
  useEffect(() => {
    if (!user || !sessionExpiry) return;

    const checkSessionExpiry = () => {
      const now = Date.now();
      if (now > sessionExpiry) {
        logout();
      }
    };

    const timer = setInterval(checkSessionExpiry, 30000); // Check every 30 seconds
    return () => clearInterval(timer);
  }, [user, sessionExpiry]);

  const login = (userData) => {
    const now = Date.now();
    const expiryTime = now + SESSION_TIMEOUT;
    
    setUser(userData);
    setSessionExpiry(expiryTime);
    
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("sessionExpiry", expiryTime.toString());
  };

  const logout = () => {
    setUser(null);
    setSessionExpiry(null);
    localStorage.removeItem("user");
    localStorage.removeItem("sessionExpiry");
  };

  // Extend session on user activity
  const extendSession = () => {
    if (user) {
      const now = Date.now();
      const newExpiryTime = now + SESSION_TIMEOUT;
      
      setSessionExpiry(newExpiryTime);
      localStorage.setItem("sessionExpiry", newExpiryTime.toString());
    }
  };

  // Add activity listeners to extend session
  useEffect(() => {
    if (!user) return;

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    
    const handleActivity = () => {
      extendSession();
    };

    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [user]);

  const getTimeRemaining = () => {
    if (!sessionExpiry) return null;
    const remaining = sessionExpiry - Date.now();
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0; // in seconds
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, getTimeRemaining }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
