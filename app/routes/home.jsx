import { useNavigate } from "react-router";
import { useAuth } from "../auth-context";
import { Welcome } from "../welcome/welcome";
import { useState, useEffect } from "react";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { user, logout, getTimeRemaining } = useAuth();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
     const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);// Update every second

    return () => clearInterval(timer);
  }, [getTimeRemaining]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatTime = (seconds) => {
    if (seconds === null) return "...";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div style={{ textAlign: "right", padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <span>Logged in as: {user?.email}</span>
        <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
          Session expires in: {formatTime(timeRemaining)}
        </div>
        <button onClick={handleLogout} style={{ marginTop: "0.5rem" }}>
          Logout
        </button>
      </div>
      <Welcome />
    </div>
  );
}
