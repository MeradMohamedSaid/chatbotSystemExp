import { useState, useEffect } from "react";
import Bot from "./Bot";
import Backward from "./Backward";
function App() {
  const [mode, setMode] = useState(true);

  const toggleMode = () => {
    setMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const textElements = document.querySelectorAll(".rainbow-text");

    function playAnimation(textElement) {
      textElement.style.animation = "rainbow 5s linear forwards";
      setTimeout(() => {
        textElement.style.animation = "none";
        setTimeout(() => playAnimation(textElement), 4000);
      }, 5000);
    }

    textElements.forEach((textElement) => {
      playAnimation(textElement);
    });

    return () => {
      textElements.forEach((textElement) => {
        textElement.style.animation = "none";
      });
    };
  }, []);

  return (
    <>
      <div className="modeSwitch">
        <div className="rope" />
        <div className="modeSwitchButtons">
          <p className={mode ? "active" : ""}>Forward</p>
          <label className="switch">
            <input
              type="checkbox"
              className="input__check"
              onClick={toggleMode}
              defaultChecked={!mode}
            />
            <span className="slider"></span>
          </label>
          <p className={!mode ? "re-active" : ""}>Backward</p>
        </div>
      </div>
      {mode ? <Bot /> : <Backward />}
    </>
  );
}

export default App;
