const strengthColors = ["#ef4444", "#f97316", "#eab308", "#3b82f6"];
const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  return score;
};

const PasswordStrengthBar = ({ password }) => {
  const strength = getStrength(password);
  return (
    <div style={{ marginTop: "6px" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "99px",
              background: password.length > 0 && i < strength ? strengthColors[strength - 1] : "#e2e8f0",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      {password.length > 0 && (
        <span style={{ fontSize: "11.5px", fontFamily: "'Outfit', sans-serif", color: strengthColors[strength - 1] || "#94a3b8", fontWeight: "500" }}>
          {strengthLabels[strength - 1] || ""}
        </span>
      )}
    </div>
  );
};

export default PasswordStrengthBar;