import { useState } from "react";

export const RadioOption = ({ id, name, value, label, checked, onChange }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <label
      htmlFor={id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "11px 14px",
        borderRadius: "9px",
        border: checked ? "1.5px solid #1e3a8a" : hovered ? "1.5px solid #94a3b8" : "1.5px solid #e2e8f0",
        background: checked ? "#eff6ff" : hovered ? "#f8fafc" : "#fff",
        cursor: "pointer",
        transition: "border-color 0.18s, background 0.18s",
        userSelect: "none",
      }}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ accentColor: "#1e3a8a", width: "16px", height: "16px", cursor: "pointer", flexShrink: 0 }}
      />
      <span style={{ fontSize: "14px",
        //  fontFamily: "'Outfit', sans-serif", 
         color: "#1e293b", fontWeight: checked ? "500" : "400" }}>
        {label}
      </span>
    </label>
  );
};