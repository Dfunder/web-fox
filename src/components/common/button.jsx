import { useState } from "react";
import ButtonSpinner  from "../common/ButtonSpinner"

export const Button = ({ children, variant = "primary", onClick, loading = false, type = "button", fullWidth = true }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const styles = {
    primary: {
      background: pressed ? "#1e3a8a" : hovered ? "#1d4ed8" : "#1e40af",
      color: "#fff",
      border: "none",
      boxShadow: hovered && !pressed ? "0 4px 14px rgba(30,64,175,0.35)" : "none",
    },
    secondary: {
      background: pressed ? "#f1f5f9" : hovered ? "#f8fafc" : "#fff",
      color: "#1e293b",
      border: hovered ? "1.5px solid #94a3b8" : "1.5px solid #e2e8f0",
      boxShadow: hovered ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
    },
  };

  const s = styles[variant] || styles.secondary;

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      disabled={loading}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "11px 20px",
        fontSize: "14px",
        // fontFamily: "'Outfit', sans-serif",
        fontWeight: "600",
        borderRadius: "9px",
        cursor: loading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        letterSpacing: "0.01em",
        transition: "all 0.18s",
        opacity: loading ? 0.75 : 1,
        transform: pressed ? "scale(0.985)" : "scale(1)",
        ...s,
      }}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg 
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:shadow-xl
        active:translate-y-0 active:shadow-md"
    >
      {loading && <ButtonSpinner />}
      {children}
    </button>
  );
};
