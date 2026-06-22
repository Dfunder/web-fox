import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "../components/common/button";
import Input from "../components/common/input";
import PasswordInput from "../components/common/passwordInput";
import { FcGoogle } from "react-icons/fc";
import { SiStellar } from "react-icons/si";
import { loginUser } from "../features/auth/authThunks";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("········");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async () => {
    if (!email || password === "········") {
      setError("Please enter your email and password");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await dispatch(loginUser({ email, password }));

      if (result.payload) {
        // Check for redirect query parameter
        const redirectParam = searchParams.get('redirect');
        const redirectPath = redirectParam ? decodeURIComponent(redirectParam) : '/dashboard';
        navigate(redirectPath);
      } else if (result.payload?.message) {
        setError(result.payload.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email, password, dispatch, navigate, searchParams]);

  return (
    <div className="min-h-screen w-154 sm:w-auto bg-linear-to-br from-blue-100 via-sky-100 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "36px 32px 32px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 8px 40px rgba(30,58,138,0.10), 0 1px 4px rgba(0,0,0,0.04)",
          animation: "fadeUp 0.45s ease both",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(30,58,138,0.30)",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              S
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#1e293b",
              letterSpacing: "-0.01em",
            }}
          >
            StellarAid
          </span>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "24px",
              fontWeight: "700",
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "13.5px",
              color: "#64748b",
            }}
          >
            Sign in to your account to continue
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "#fee2e2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "13px",
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        )}

        {/* Email */}
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showStrength={false}
          autoComplete="current-password"
        />

        {/* Forgot Password Link */}
        <div style={{ textAlign: "right" }}>
          <a
            href="/forgot-password"
            style={{
              fontSize: "12px",
              color: "#1d4ed8",
              fontWeight: "600",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1e3a8a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          >
            Forgot password?
          </a>
        </div>

        {/* Primary CTA */}
        <Button variant="primary" onClick={handleSubmit} loading={loading} type="submit">
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        {/* OR Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          <span
            style={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            or
          </span>
          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
        </div>

        {/* Social / Wallet */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button variant="secondary" onClick={() => {}}>
            <FcGoogle size={"20px"} />
            Continue with Google
          </Button>
          <Button variant="secondary" onClick={() => {}}>
            <SiStellar size={"20px"} color="#1e3a8a" />
            Connect Stellar Wallet
          </Button>
        </div>

        {/* Sign-up link */}
        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#1d4ed8",
              fontWeight: "600",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1e3a8a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
