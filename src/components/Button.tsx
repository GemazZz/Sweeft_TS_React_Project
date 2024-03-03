import { FC } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  width: number;
  height: number;
  textContent: any;
  address?: string;
}

const Button: FC<ButtonProps> = ({ width, height, textContent, address = "#" }) => {
  return (
    <Link to={address}>
      <button style={{ width: width, height: height }}>{textContent}</button>
    </Link>
  );
};

export default Button;
