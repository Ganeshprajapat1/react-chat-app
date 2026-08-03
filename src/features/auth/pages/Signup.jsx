import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import Logo from "../../../components/Logo/Logo";

import { notify } from "../../../utils/notification";

import { signupUser, sendVerificationEmailThunk } from "../store/authThunk";

import useFormValidation from '../../../hooks/useFormValidation.js';

import { validateName, validateEmail, validatePassword, validateConfirmPassword } from '../../../utils/validation/authValidation.js';

import "../styles/auth.css";

const Signup = () => {
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
  } = useFormValidation(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    {
      name: (value) =>
        validateName(value),

      email: (value) =>
        validateEmail(value),

      password: (value) =>
        validatePassword(value),

      confirmPassword: (value, form) =>
        validateConfirmPassword(
          form.password,
          value
        ),
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
      signupUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword:
          formData.confirmPassword,
      })
    );

    if (signupUser.fulfilled.match(result)) {
      await dispatch(
        sendVerificationEmailThunk()
      );

      notify.success(
        "Verification email sent successfully."
      );

      navigate("/verify-email");
    }
  };

  return (
    <div className="auth-page">

      <div className="logo">
        <Logo />
      </div>

      <div className="auth-card">

        <h1>Create Account</h1>

        <p>
          Join us and start chatting with your friends.
        </p>

        <form onSubmit={handleSubmit}>

          <AuthInput
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <span className="input-error">
              {errors.name}
            </span>
          )}

          <AuthInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <span className="input-error">
              {errors.email}
            </span>
          )}

          <PasswordInput
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <span className="input-error">
              {errors.password}
            </span>
          )}

          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {errors.confirmPassword && (
            <span className="input-error">
              {errors.confirmPassword}
            </span>
          )}

          <AuthButton
            loading={loading}
            text="Create Account"
            loadingText="Creating Account..."
            disabled={!isFormValid}
          />

        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Signup;