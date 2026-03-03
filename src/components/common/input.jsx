import { useState } from "react";

const Input = ({ label, type = "text", placeholder, value, onChange, id, autoComplete }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: "13px",
            fontWeight: "700",
            color: "#374151",
            // fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "10px 13px",
          fontSize: "14px",
        //   fontFamily: "'Outfit', sans-serif",
          color: "#1e293b",
          background: focused ? "#fff" : "#f8fafc",
          border: focused ? "1.5px solid #1e3a8a" : "1.5px solid #e2e8f0",
          borderRadius: "8px",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.18s, background 0.18s, box-shadow 0.18s",
          boxShadow: focused ? "0 0 0 3px rgba(30,58,138,0.10)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!focused) e.currentTarget.style.borderColor = "#94a3b8";
        }}
        onMouseLeave={(e) => {
          if (!focused) e.currentTarget.style.borderColor = "#e2e8f0";
        }}
      />
    </div>
  );
};

export default Input;