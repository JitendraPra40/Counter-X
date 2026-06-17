import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AdminLogin.module.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      form.email === "admin@counterx.com" &&
      form.password === "admin123"
    ) {
      localStorage.setItem("role", "admin");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleLogin}>
        <h1>Admin Login</h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              email: e.target.value,
            }))
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              password: e.target.value,
            }))
          }
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;