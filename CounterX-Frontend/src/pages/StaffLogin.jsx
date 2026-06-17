import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/StaffLogin.module.css";

const StaffLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      form.email === "staff@counterx.com" &&
      form.password === "staff123"
    ) {
      localStorage.setItem("role", "staff");
      navigate("/kitchen");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleLogin}>
        <h1>Staff Login</h1>

        <input
          type="email"
          placeholder="Staff Email"
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

export default StaffLogin;