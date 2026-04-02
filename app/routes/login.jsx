import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth-context";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123456") {
      setErrorMessage("");
      login({ email: "admin", id: "admin-user" });
      navigate("/");
      return;
    }

    setErrorMessage("Credenciais invalidas.");
  };

  return (
    <main className="login-shell">
      <section className="login-card" aria-label="Client area login">
        <div className="login-logo" aria-hidden="true">
          <span className="login-logo-mark">TICKET</span>
          <span className="login-logo-line">LINE</span>
        </div>

        <h1 className="login-title">AREA DE CLIENTE</h1>
        <p className="login-subtitle">Aceda a sua conta para gerir bilhetes e faturas</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              autoComplete="current-password"
              required
            />
          </div>

          {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

          <button type="submit" className="login-submit">
            Entrar
          </button>
        </form>

        <div className="login-links">
          <a href="#">Esqueci a password</a>
          <span>|</span>
          <a href="#">Criar conta</a>
        </div>
      </section>
    </main>
  );
}
