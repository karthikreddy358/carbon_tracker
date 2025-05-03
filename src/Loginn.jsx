import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import carbonImage from "./assets/carbonpic.png";  // Adjust if needed

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        navigate("/Home");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setMessage("");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.left}>
          <img src={carbonImage} alt="Carbon Tracker" style={styles.image} />
        </div>
        <div style={styles.right}>
          <h2 style={styles.title}>Login to Carbon Tracker</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              style={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>

          {message && <p style={{ ...styles.feedback, color: "green" }}>{message}</p>}
          {error && <p style={{ ...styles.feedback, color: "red" }}>{error}</p>}

          <p style={styles.footerText}>
            Don’t have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  // Same as your previous styling
  page: {
    height: "100vh",
    width: "210vh",
    background: "linear-gradient(to right, #a8e6a1, #88d28a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  container: {
    display: "flex",
    backgroundColor: "#f1fdf4",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "950px",
    width: "95%",
    overflow: "hidden",
  },
  left: {
    flex: 1,
    backgroundColor: "#e6f4ea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  image: {
    width: "100%",
    height: "auto",
    maxWidth: "350px",
    borderRadius: "10px",
  },
  right: {
    flex: 1,
    padding: "40px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 15px",
    margin: "10px 0",
    backgroundColor: "#ffffff",
    border: "1px solid #c8e6c9",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
    color: "#333",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    marginTop: "10px",
  },
  feedback: {
    marginTop: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
    color: "#555",
  },
  link: {
    color: "#2e7d32",
    textDecoration: "none",
    fontWeight: "500",
    cursor: "pointer",
  },
};

export default Login;
