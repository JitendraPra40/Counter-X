import logo from "../assets/logo.png";
import styles from "./BrandLogo.module.css";

const BrandLogo = ({
  size = 160,
  alt = "CounterX",
  className = "",
}) => {
  return (
    <img
      src={logo}
      alt={alt}
      className={`${styles.logo} ${className}`}
      style={{
        width: `${size}px`,
        height: "auto",
      }}
    />
  );
};

export default BrandLogo;