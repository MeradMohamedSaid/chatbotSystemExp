import botLogo from "./assets/react.svg";
import UserLogo from "./assets/react.svg";
import WeatherLogo from "./assets/react.svg";

const Logo = ({ type }) => {
  return (
    <>
      <div
        className={`logo ${type === 1 && "botLogo"} ${
          type === 2 && "userLogo"
        } ${type === 3 && "weatherLogo"}`}
      ></div>
    </>
  );
};

export default Logo;
