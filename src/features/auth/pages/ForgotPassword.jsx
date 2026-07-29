import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../store/authThunk";
import { notify } from "../../../utils/notification";

import Logo from "../../../components/Logo/Logo";
import '../styles/forgotPassword.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      notify.error("Please enter your email.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      notify.error("Please enter a valid email address.");
      return;
    }

    const result = await dispatch(resetPassword(trimmedEmail));

    if (resetPassword.fulfilled.match(result)) {

      notify.success("Password reset link has been sent to your email.");
      setEmail("");

      navigate("/login");
    } else {
      notify.error(result.payload || "Something went wrong.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="logo">
        <Logo/>
      </div>
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <p> Enter your registered email address. We'll send you a password reset link. </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading}> { loading ? "Sending..." : "Send Reset Link" } </button>
        </form>
        {/* <Link to="/login" className="back-login" > Back to Login </Link> */}
      </div>
    </div>
  );
};

export default ForgotPassword;