import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../../components/Logo/Logo";

import { resetPassword } from "../store/authThunk";
import { notify } from "../../../utils/notification";

import useFormValidation from "../../../hooks/useFormValidation.js";
import { validateEmail } from '../../../utils/validation/authValidation.js';

import "../styles/forgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const {
    formData,
    errors,
    handleChange,
    validateForm,
    isFormValid,
    setFormData,
  } = useFormValidation(
    {
      email: "",
    },
    {
      email: (value) => validateEmail(value),
    }
  );

  useEffect(() => {
    if (error) {
      notify.error(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await dispatch(
      resetPassword(formData.email.trim())
    );

    if (resetPassword.fulfilled.match(result)) {
      notify.success(
        "Password reset link has been sent to your email."
      );

      setFormData({
        email: "",
      });

      navigate("/login");
    }
  };

  return (
    <div className="forgot-container">

      <div className="logo">
        <Logo />
      </div>

      <div className="forgot-card">

        <h2>Forgot Password</h2>

        <p>
          Enter your registered email address.
          We'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <span className="input-error">
              {errors.email}
            </span>
          )}

          <button
            type="submit"
            disabled={loading || !isFormValid}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        {/* <Link to="/login" className="back-login">
          Back to Login
        </Link> */}

      </div>
    </div>
  );
};

export default ForgotPassword;