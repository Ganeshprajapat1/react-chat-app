const AuthInput = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="input-group">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AuthInput;