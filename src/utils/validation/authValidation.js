// Email
export const validateEmail = (email) => {
  const value = email.trim();

  if (!value) {
    return "Email is required.";
  }

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(value)) {
    return "Please enter a valid email address.";
  }

  return "";
};

// Name
export const validateName = (name) => {
  const value = name.trim();

  if (!value) {
    return "Full name is required.";
  }

  const nameRegex = /^[a-zA-Z\s]{3,50}$/;

  if (!nameRegex.test(value)) {
    return "Name should be 3-50 characters and contain only letters.";
  }

  return "";
};

// Password
export const validatePassword = (password) => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

  if (!passwordRegex.test(password)) {
    return "Password must contain at least one letter and one number.";
  }

  return "";
};

// Confirm Password
export const validateConfirmPassword = (
  password,
  confirmPassword
) => {
  if (!confirmPassword) {
    return "Confirm password is required.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
};