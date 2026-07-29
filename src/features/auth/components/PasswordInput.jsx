import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PasswordInput = ({
  name,
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group password-group">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // required
      />

      <span
        className="password-icon"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEye /> : <IoEyeOff />}
      </span>
    </div>
  );
};

export default PasswordInput;