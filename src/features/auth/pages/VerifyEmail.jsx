import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Logo from "../../../components/Logo/Logo";

import {
  sendVerificationEmailThunk,
  checkEmailVerificationThunk,
  createUserProfileThunk,
  logoutUser,
} from "../store/authThunk";

import { notify } from "../../../utils/notification";

import "../styles/verifyEmail.css";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    verificationLoading,
    verificationChecking,
  } = useSelector((state) => state.auth);

  const [countdown, setCountdown] = useState(60);

  /* ---------------- Countdown ---------------- */

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  /* ---------------- User Check ---------------- */

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  /* ---------------- Auto Check Every 5 Seconds ---------------- */

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      const result = await dispatch(checkEmailVerificationThunk());

      if (
        checkEmailVerificationThunk.fulfilled.match(result) &&
        result.payload.emailVerified
      ) {
        await dispatch(createUserProfileThunk());

        notify.success("Welcome to ReactChat!");

        navigate("/chat");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, user, navigate]);

  /* ---------------- Resend Email ---------------- */

  const handleResend = async () => {
    if (countdown > 0) return;

    const result = await dispatch(sendVerificationEmailThunk());

    if (sendVerificationEmailThunk.fulfilled.match(result)) {
      notify.success("Verification email sent.");

      setCountdown(60);
    } else {
      notify.error(result.payload || "Failed to send email.");
    }
  };

  /* ---------------- Manual Verification ---------------- */

  const handleVerified = async () => {
    const result = await dispatch(checkEmailVerificationThunk());

    if (checkEmailVerificationThunk.fulfilled.match(result)) {
      if (!result.payload.emailVerified) {
        notify.error("Please verify your email first.");
        return;
      }

      await dispatch(createUserProfileThunk());

      notify.success("Welcome to ReactChat!");

      navigate("/chat");
    }
  };

  /* ---------------- Logout ---------------- */

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="verify-container">
      <div className="logo">
        <Logo />
      </div>

      <div className="verify-card">

        <div className="verify-icon">
          📧
        </div>

        <h2>Verify Your Email</h2>

        <p>
          We've sent a verification email to
        </p>

        <h4>{user?.email}</h4>

        <p className="verify-note">
          Please open your inbox and click the verification link.
          <br />
          This page will automatically detect verification.
        </p>

        <button
          className="verify-btn"
          onClick={handleVerified}
          disabled={verificationChecking}
        >
          {verificationChecking
            ? "Checking..."
            : "I've Verified"}
        </button>

        <button
          className="resend-btn"
          disabled={countdown > 0 || verificationLoading}
          onClick={handleResend}
        >
          {verificationLoading
            ? "Sending..."
            : countdown > 0
            ? `Resend in ${countdown}s`
            : "Resend Email"}
        </button>

        <button
          className="resend-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;