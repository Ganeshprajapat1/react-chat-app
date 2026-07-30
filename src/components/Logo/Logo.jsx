import "./logo.css";
import logo from '../../assets/images/ReactChat_Logo.png';

const Logo = () => {
  return (
    <div className="logo-container">
      <img style={{height: "100px"}} src={logo} alt="logo" />
    </div>
  );
};

export default Logo;