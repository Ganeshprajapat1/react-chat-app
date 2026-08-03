const AuthButton = ({
  loading,
  text,
  loadingText,
  disabled,
}) => {
  return (
    <button
      className="auth-btn"
      disabled={loading || disabled}
      type="submit"
    >
      {loading ? loadingText : text}
    </button>
  );
};

export default AuthButton;