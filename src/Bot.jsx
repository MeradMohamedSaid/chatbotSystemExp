import React, { useEffect, useRef, useState } from "react";
import "./bot.css";

import Logo from "./logo";
import { FaArrowTurnUp } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

const Bot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [started, setStarted] = useState(false);
  const [chating, setChating] = useState(true);
  const [conditions, setConditions] = useState({
    temperature: { checked: 0, status: 0, message: "" },
    sky: { checked: 0, status: 0, message: "" },
    wind: { checked: 0, status: 0, message: "" },

    heatwave: { checked: 0, status: 0, message: "" },
    snow: { checked: 0, status: 0, message: "" },
    flooding: { checked: 0, status: 0, message: "" },
    rain: { checked: 0, status: 0, message: "" },
    storm: { checked: 0, status: 0, message: "" },
  });

  const [result, setResult] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [trigger, setTrigger] = useState(false);

  const suggestions = [
    conditions.temperature.checked === 0 && "temperature is high",
    conditions.temperature.checked === 0 && "temperature is low",
    conditions.sky.checked === 0 && "sky is clear",
    conditions.sky.checked === 0 && "sky is cloudy",
    conditions.wind.checked === 0 && "wind is strong",
    conditions.wind.checked === 0 && "wind is weak",
  ];
  const addSuggestionToInput = (suggestion) => {
    setUserInput(suggestion);
  };
  useEffect(() => {
    var myConditions = conditions;
    console.log("condition before checking : ", myConditions);
    if (myConditions.rain.checked === 0) {
      if (myConditions.sky.status === 0 && myConditions.sky.checked === 1) {
        myConditions = {
          ...myConditions,
          rain: {
            checked: 1,
            status: 0,
            message: "it will probably rain.",
          },
        };
        // sendResponse(3, "It will probably rain.");
      }
    }
    console.log("condition after rain check : ", myConditions);

    if (myConditions.snow.checked === 0) {
      if (
        myConditions.temperature.checked === 1 &&
        myConditions.sky.checked === 1
      ) {
        if (
          myConditions.temperature.status === 0 &&
          myConditions.sky.status === 0
        ) {
          myConditions = {
            ...myConditions,
            snow: {
              checked: 1,
              status: 0,
              message: "it will probably snow.",
            },
          };
          sendResponse(3, "It will probably snow.");
        } else {
          myConditions = {
            ...myConditions,
            snow: {
              checked: 1,
              status: 1,
              message: "it will not snow",
            },
          };
        }
      }
    }
    console.log("condition after snow check : ", myConditions);

    if (myConditions.storm.checked === 0) {
      if (myConditions.wind.checked === 1 && myConditions.rain.checked === 1) {
        if (myConditions.wind.status === 0 && myConditions.rain.status === 0) {
          myConditions = {
            ...myConditions,
            storm: {
              checked: 1,
              status: 0,
              message: "there is a chance of a storm.",
            },
          };
          sendResponse(3, "There is a chance of a storm.");
        } else {
          myConditions = {
            ...myConditions,
            storm: {
              checked: 1,
              status: 1,
              message: "there is not chance of a storm.",
            },
          };
        }
      }
    }
    console.log("condition after storm check : ", myConditions);

    if (myConditions.heatwave.checked === 0) {
      if (
        myConditions.temperature.checked === 1 &&
        myConditions.wind.checked === 1
      ) {
        if (
          myConditions.temperature.status === 1 &&
          myConditions.wind.status === 0
        ) {
          myConditions = {
            ...myConditions,
            heatwave: {
              checked: 1,
              status: 0,
              message: "There is a chance of a heatwave.",
            },
          };
          sendResponse(3, "there is a chance of a heatwave.");
        } else {
          myConditions = {
            ...myConditions,
            heatwave: {
              checked: 1,
              status: 1,
              message: "There is not chance of a heatwave.",
            },
          };
        }
      }
    }
    console.log("condition after heatwave check : ", myConditions);

    if (myConditions.flooding.checked === 0) {
      if (myConditions.storm.checked === 1) {
        if (myConditions.storm.status === 0) {
          myConditions = {
            ...myConditions,
            flooding: {
              checked: 1,
              status: 0,
              message: " there is a risk of flooding",
            },
          };
          sendResponse(3, "There is a risk of flooding.");
        } else {
          myConditions = {
            ...myConditions,
            flooding: {
              checked: 1,
              status: 0,
              message: " there is no risk of flooding",
            },
          };
        }
      }
    }
    console.log("condition after flooding check : ", myConditions);

    console.log(myConditions);
    // Update the conditions state at the end
    setConditions((conditions) => myConditions);
    setTrigger(false);
  }, [trigger]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      sendResponse(
        1,
        "Hello user, Welcome to AI weather prediction using Rule-based Expert Systems. Start by sending your first weather condition, e.g., 'temperature is high'."
      );
      firstRender.current = false;
    }
  }, [firstRender]);

  const handleUserInput = (e) => {
    setStarted(true);
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() !== "") {
      await sendMessage(userInput);
      controlInputs(userInput);
      setUserInput("");
    }
  };

  const handleReset = async () => {
    setConditions({
      temperature: { checked: 0, status: 0, message: "" },
      sky: { checked: 0, status: 0, message: "" },
      wind: { checked: 0, status: 0, message: "" },
      heatwave: { checked: 0, status: 0, message: "" },
      snow: { checked: 0, status: 0, message: "" },
      flooding: { checked: 0, status: 0, message: "" },
      rain: { checked: 0, status: 0, message: "" },
      storm: { checked: 0, status: 0, message: "" },
    });
    setChatHistory([]);

    setChating(true);
    sendResponse(
      1,
      "Hello user, Welcome to AI weather prediction using Rule-based Expert Systems. Start by sending your first weather condition, e.g., 'temperature is high'."
    );
    setTrigger(false);
  };

  const controlInputs = (input) => {
    input = input.toLowerCase();
    if (input.includes("result")) {
      sendMessage("Result");
      setChating((chating) => false);
    } else {
      if (input.includes("is")) {
        devideSentence(input);
      } else {
        sendResponse(1, "i can't understand your message");
      }
    }
    setTrigger(true);
  };

  const sendMessage = async (msg) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        setChatHistory((chatHistory) => [
          ...chatHistory,
          { user: true, text: msg },
        ]);
        console.log("sent");
        console.log(chatHistory);
        resolve(); // Resolve the Promise here
      }, 50);
    });
  };

  const sendResponse = async (bot, msg) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        setChatHistory((chatHistory) => [
          ...chatHistory,
          { user: false, text: msg, botName: bot === 1 ? "bot" : "Expert" },
        ]);
        console.log("replied");
        console.log(chatHistory);
        resolve(); // Resolve the Promise here
      }, 1000);
    });
  };

  const vocabularyDictionary = {
    temperature: {
      low: ["low", "cool", "cold", "chilly", "frigid", "freezing", "frosty"],
      high: ["high", "hot", "warm", "scorching", "boiling", "searing", "balmy"],
    },
    wind: {
      strong: ["strong", "powerful", "gusty", "blustery", "breezy"],
      weak: ["weak", "gentle", "calm", "light", "mild", "soft"],
    },
    sky: {
      cloudy: [
        "cloudy",
        "overcast",
        "overclouded",
        "gloomy",
        "dreary",
        "dull",
        "hazy",
        "dusky",
      ],
      clear: [
        "clear",
        "sunny",
        "bright",
        "nclouded",
        "cloudless",
        "fair",
        "radiant",
      ],
    },
  };

  const checkSynonyms = (word, dictionary) => {
    for (const synonym of dictionary) {
      if (synonym === word) {
        return true;
      }
    }
    return false;
  };

  const extractKey = (word) => {
    for (const key in vocabularyDictionary) {
      if (vocabularyDictionary.hasOwnProperty(key)) {
        const synonyms = vocabularyDictionary[key];
        for (const synonymKey in synonyms) {
          if (synonyms.hasOwnProperty(synonymKey)) {
            const synonymList = synonyms[synonymKey];
            if (synonymList.includes(word)) {
              const synonymIndex = Object.keys(synonyms).indexOf(synonymKey);
              const isMain = synonymList.indexOf(word) === 0 ? true : false;
              console.log({
                key: key,
                synonymKey: synonymKey,
                index: synonymIndex,
                isMain: isMain,
              });
              return {
                key: key,
                synonymKey: synonymKey,
                index: synonymIndex,
                isMain: isMain,
              };
            }
          }
        }
      }
    }
    return null;
  };

  const devideSentence = (input) => {
    input = input.replace(/\bthe\b/g, " ");
    input = input.trim();
    const sentences = input.split(" and ");
    sentences.forEach((sentence) => {
      var found = false;
      const parts = sentence.split(" is ");
      const leftPart = parts[0]
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word !== "");
      const rightPart = parts[1]
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word !== "");
      if (leftPart[0] === "temperature") {
        found = true;
        if (conditions.temperature.checked === 0) {
          if (
            checkSynonyms(rightPart[0], vocabularyDictionary.temperature.high)
          ) {
            // (rightPart[0] === "high")
            sendResponse(
              1,
              "got it ,your area has a HIGH temperature out there"
            );
            setConditions((prevConditions) => ({
              ...prevConditions,
              temperature: { checked: 1, status: 1, message: "High" },
            }));
            console.log("got it");
          } else {
            if (
              checkSynonyms(rightPart[0], vocabularyDictionary.temperature.low)
              // rightPart[0] === "low"
            ) {
              sendResponse(
                1,
                "got it ,your area has a LOW temperature out there."
              );
              setConditions((prevConditions) => ({
                ...prevConditions,
                temperature: { checked: 1, status: 0, message: "Low" },
              }));
              console.log("got it");
            } else {
              sendResponse(1, "sorry but temperature can only be high or low");
              console.log("got it");
            }
          }
        } else {
          sendResponse(
            1,
            `i already know what is like out there, ${
              "temperature is " + conditions.temperature.message
            }, ${
              conditions.wind.checked === 0 && conditions.sky.checked === 0
                ? "what about something else? wind ? , or maybe sky ?"
                : conditions.wind.checked === 0
                ? "what about something else? wind maybe?"
                : conditions.sky.checked === 0
                ? "what about something else? sky maybe?"
                : "i can predict the weather now , type result."
            }`
          );
        }
      }
      if (leftPart[0] === "wind") {
        found = true;
        if (conditions.wind.checked === 0) {
          if (
            checkSynonyms(rightPart[0], vocabularyDictionary.wind.strong)
            // rightPart[0].includes("strong")
          ) {
            sendResponse(1, "Got it , the wind is strong there");
            setConditions((prevConditions) => ({
              ...prevConditions,
              wind: { checked: 1, status: 0, message: "Strong" },
            }));
            console.log("got it");
          } else if (
            checkSynonyms(rightPart[0], vocabularyDictionary.wind.weak)
            // rightPart[0].includes("weak")
          ) {
            sendResponse(1, "Got it , the wind is weak there.");
            setConditions((prevConditions) => ({
              ...prevConditions,
              wind: { checked: 1, status: 1, message: "Weak" },
            }));
            console.log("got it");
          } else {
            sendResponse(1, "wind can only be strong or weak");
          }
        } else {
          sendResponse(
            1,
            `i already know how it look like out there, ${
              "wind is " + conditions.wind.message
            }, ${
              conditions.temperature.checked === 0 &&
              conditions.sky.checked === 0
                ? "what about something else? sky ? , or maybe temperature ?"
                : conditions.temperature.checked === 0
                ? "what about something else? temperature maybe?"
                : conditions.sky.checked === 0
                ? "what about something else? sky maybe?"
                : "i can predict the weather now , type result."
            }`
          );
        }
      }
      if (leftPart[0] === "sky") {
        found = true;
        if (conditions.sky.checked === 0) {
          if (
            checkSynonyms(rightPart[0], vocabularyDictionary.sky.cloudy)

            // rightPart[0].includes("cloudy")
          ) {
            sendResponse(1, "got it , sky is cloudy there");
            setConditions((prevConditions) => ({
              ...prevConditions,
              sky: { checked: 1, status: 0, message: "Cloudy" },
              rain: { checked: 1, status: 0, message: "rain" },
            }));
            console.log("got it");
          } else if (
            checkSynonyms(rightPart[0], vocabularyDictionary.sky.clear)
            // rightPart[0].includes("clear")
          ) {
            sendResponse(1, "got it , the sky is clear there.");
            setConditions((prevConditions) => ({
              ...prevConditions,
              sky: { checked: 1, status: 1, message: "Clear" },
              rain: { checked: 1, status: 1, message: "clear" },
            }));
            console.log("got it");
          } else {
            sendResponse(1, "sky can only be clear or cloudy");
          }
        } else {
          sendResponse(
            1,
            `i already know how it look like out there, ${
              "sky is " + conditions.sky.message
            }, ${
              conditions.temperature.checked === 0 &&
              conditions.wind.checked === 0
                ? "what about something else? wind ? , or maybe temperature ?"
                : conditions.temperature.checked === 0
                ? "what about something else? temperature maybe?"
                : conditions.wind.checked === 0
                ? "what about something else? wind maybe?"
                : "i can predict the weather now , type result."
            }`
          );
        }
      }
      if (leftPart[0] === "it") {
        var keys = extractKey(rightPart[0]);
        if (keys) {
          if (conditions[keys.key].checked === 0) {
            if (keys.isMain) {
              sendResponse(1, `Got it , status of ${keys.key} is saved.`);
            } else {
              sendResponse(
                1,
                `is see , the ${keys.key} is ${keys.synonymKey} there.`
              );
            }

            setConditions((prevConditions) => ({
              ...prevConditions,
              [keys.key]: {
                checked: 1,
                status: keys.index,
                message: keys.synonymKey,
              },
            }));
          } else {
            sendResponse(
              1,
              `i already know that the ${keys.key} is ${
                conditions[keys.key].message
              }, can you give an information about something else?`
            );
          }
          found = true;
        }
      }
      if (!found) {
        sendResponse(1, "i can't understand your message");
      }
    });
  };

  const clearHistory = () => {
    setChatHistory([]);
    if (!started) {
      sendResponse(
        1,
        "Hello user, Welcome to AI weather prediction using Rule-based Expert Systems. Start by sending your first weather condition, e.g., 'temperature is high'."
      );
    }
  };

  const printResults = () => {
    console.log("first results : ", conditions);

    var result = false;
    var message =
      "Based on the informations that u provided , i can say that : ";
    if (conditions.heatwave.checked === 1) {
      if (conditions.heatwave.status === 0) {
        message += "\n There is a chance of a heatwave";
        console.log(message);
        result = true;
      }
    }

    if (conditions.snow.checked === 1) {
      if (conditions.snow.status === 0) {
        message += "\nIt will probably snow";
        console.log(message);
        result = true;
      }
    }

    if (conditions.storm.checked === 1) {
      if (conditions.storm.status === 0) {
        message += "\nmaybe a storm is coming and a big risk of flooding";
        console.log(message);
        result = true;
      }
    }

    console.log(result);
    console.log("Last results : ", conditions);

    if (result === true) {
      sendResponse(3, message);
    } else {
      var tests = "";
      if (conditions.temperature.checked === 1) {
        if (conditions.temperature.status === 1) {
          tests += "\nIt is Hot.";
        } else {
          tests += "\nIt is Cold.";
        }
      }
      if (conditions.sky.checked === 1) {
        if (conditions.sky.status === 1) {
          tests += "\nIt will not rain.";
        } else {
          tests += "\nit will probably rain.";
        }
      }
      if (conditions.wind.checked === 1) {
        if (conditions.wind.status === 1) {
          tests += "\nIt is quite.";
        } else {
          tests += "\nThe wind is strong.";
        }
      }
      // console.log("test: ", tests);
      if (tests !== "") {
        message += tests;
        console.log(message);
        sendResponse(3, message);
      } else {
        sendResponse(
          3,
          "Well , i can't predict any thing , because no information was provided"
        );
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="titleCH  rainbow-text">Forward Chaining</div>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={
              message.user
                ? "chat-message user-message"
                : message.botName === "bot"
                ? "chat-message bot-message"
                : "chat-message weather-message"
            }
          >
            <div className="userName">
              <Logo
                type={message.user ? 2 : message.botName === "bot" ? 1 : 3}
              />
              {message.user
                ? "You"
                : message.botName === "bot"
                ? "Chat Bot"
                : "Weather Predictor"}
            </div>
            <span className="message-content">{message.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="footer">
        {chating && (
          <div className="suggestions">
            {suggestions.map(
              (suggestion, index) =>
                suggestion && (
                  <button
                    key={index}
                    className="suggestion-button"
                    onClick={() => addSuggestionToInput(suggestion)}
                  >
                    {suggestion}
                  </button>
                )
            )}
          </div>
        )}
        <div className={`chat-input ${chating === false && "disabledInput"}`}>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Message WeatherBot ..."
            disabled={!chating}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          {chating && (
            <button
              onClick={handleSendMessage}
              disabled={!chating}
              className="send-button"
            >
              <FaArrowTurnUp />
            </button>
          )}
          {chating && (
            <button
              onClick={async () => {
                controlInputs("result");
                printResults();
              }}
              className="show-result-button"
            >
              <IoMdCheckmarkCircleOutline />
            </button>
          )}
          {!chating && (
            <button onClick={handleReset} className="restart-button">
              <VscDebugRestart />
            </button>
          )}
        </div>
        <p>
          WeatherBot can make mistakes. Consider checking important information.
        </p>
      </div>
      {/* <button onClick={clearHistory} className="clear-button">
        Clear
      </button> */}
    </div>
  );
};

export default Bot;
