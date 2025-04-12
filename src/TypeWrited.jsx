import React, { useState, useEffect } from "react";
import "./Typewriter.css";

const Typewriter = ({ message }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");

    message.split("").forEach((char, index) => {
      setTimeout(() => {
        setText((prevText) => prevText + char);
      }, 50 * index);
    });
  }, [message]);

  return (
    <div className="typewriter">
      <p className="typewriter-text">
        {text.split("").map((char, index) => {
          if (char === "#") {
            return (
              <>
                <br />
                <br />
              </>
            );
          }
          if (char === "@") {
            return (
              <>
                <br />
                <span key={index} className="status">
                  {char}
                </span>
              </>
            );
          }
          if (char === "[") {
            return (
              <>
                <br />
                <span key={index} className="good">
                  {char}
                </span>
              </>
            );
          }
          if (char === "]") {
            return (
              <>
                <span key={index} className="good">
                  {char}
                </span>
              </>
            );
          }
          return <span key={index}>{char}</span>;
        })}
      </p>
    </div>
  );
};

export default Typewriter;
