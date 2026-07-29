const AuthButton = ({
  loading,
  text,
  loadingText,
}) => {
  return (
    <button
      className="auth-btn"
      disabled={loading}
      type="submit"
    >
      {loading ? loadingText : text}
    </button>
  );
};

export default AuthButton;