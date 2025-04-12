import { Fragment, useState, useRef, useEffect } from "react";
import "./YesNo.css";

import { FaArrowTurnUp } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import Logo from "./logo";

const YesNo = () => {
  const [chating, setChating] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [started, setStarted] = useState(false);
  const [questionnaire, setQuestionnaire] = useState(false);
  const [userResponse, setUserResponse] = useState(-1);
  const [currentProperty, setCurrentProperty] = useState({
    key: null,
    value: 0,
    answserd: false,
    response: "",
  });
  const [answerdQuestions, setAnswerdQuestions] = useState([]);

  const [keysToCheck, setKeysToCheck] = useState([]);
  const [keysSetups, setKeysSetups] = useState(false);

  const chooseRes = (res) => {
    if (res === 1) setUserResponse((old) => 1); //hot
    else if (res === 2) setUserResponse((old) => 0); //cold
    else if (res === 3) setUserResponse((old) => 3); //idk
    else return;
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUserInput = (e) => {
    setStarted(true);
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() !== "") {
      await sendMessage(userInput);
      // controlInputs(userInput);
      setUserInput("");
    }
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
    sendResponse(2, "yo");
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

  const [question, setQuestion] = useState("What is your question ? ");
  const questionDiv = useRef(null);

  const modifyQuestion = (newQuestion) => {
    setQuestion(newQuestion);
    if (questionnaire) {
      questionDiv.current.style.display = "none";
      new Promise((resolve) => {
        setTimeout(() => {
          questionDiv.current.style.display = "block";
        }, 10);
        resolve();
      });
    }
  };

  const [mainQuestion, setMainQuestion] = useState("Your Question");
  const [Conditions, setConditions] = useState({
    temperature: {
      question: "Is it hot?",
      conditions: {
        temperature: 1,
      },
      complex: false,
      idk: false,
      hot: true,
    },
    sky: {
      question: "Is it cloudy?",
      conditions: {
        sky: 0,
      },
      complex: false,
      idk: false,
      hot: false,
    },
    wind: {
      question: "Is it windy?",
      conditions: {
        wind: 0,
      },
      complex: false,
      idk: false,
      hot: false,
    },
    rain: {
      question: "Will it rain?",
      conditions: {
        sky: 0,
      },
      complex: true,
      idk: true,
      hot: false,
    },
    snow: {
      question: "Will it snow?",
      conditions: {
        sky: 0,
        temperature: 0,
      },
      complex: true,
      idk: true,
      hot: false,
    },
    heatwave: {
      question: "Is there any risk of a heatwave ?",
      conditions: {
        wind: 0,
        temperature: 1,
      },
      complex: true,
      idk: false,
      hot: true,
    },
    storm: {
      question: "Is there any risk of a storm ?",
      conditions: {
        wind: 0,
        rain: 0,
      },
      complex: true,
      idk: true,
      hot: false,
    },
    flooding: {
      question: "Is there any risk of a flooding ?",
      conditions: {
        storm: 0,
      },
      complex: true,
      idk: false,
      hot: false,
    },
  });

  const [toCheck, setToCheck] = useState({
    solved: false,
    selected: {},
    currentCondition: -1,
    setted: false,
  });

  const [starting, setStarting] = useState(true);
  const [startingObject, setStartingObject] = useState({
    temperature: { checked: false, status: 0 },
    sky: { checked: false, status: 0 },
    wind: { checked: false, status: 0 },
    heatwave: { checked: false, status: 0 },
    snow: { checked: false, status: 0 },
    flooding: { checked: false, status: 0 },
    rain: { checked: false, status: 0 },
    storm: { checked: false, status: 0 },
  });

  const setupKeys = (keys) => {
    if (keysSetups) return;
    var table = [];
    keys.forEach((key, index) => {
      console.log("key ", index, " : ", key);
      if (Conditions[key].complex) {
        table.push(key);
        var newkeys = Object.keys(Conditions[key].conditions);
        console.log("Key Complex");
        newkeys.forEach((keye) => table.push(keye));
      } else {
        table.push(key);
      }
    });
    console.log(table);
    setKeysToCheck((old) => table);
    setKeysSetups((old) => true);
  };

  const startCheck = async (object, key) => {
    var old = toCheck;
    if (!toCheck.setted) {
      old = { ...old, selected: object, setted: true, currentCondition: 0 };
      setToCheck((oldOj) => old);
      await setStarting(false);
      setMainQuestion(object.question);
      console.log("Object setted : ", object);
      console.log("object : ", old);
      console.log("key : ", key);
      setQuestionnaire(true);
    }
  };

  useEffect(() => {
    if (currentProperty.key !== null) {
      console.log("question : ", currentProperty);
    }
  }, [currentProperty]);

  useEffect(() => {
    if (toCheck.currentCondition !== -1) {
      if (
        Object.keys(toCheck.selected.conditions).length >
        toCheck.currentCondition
      ) {
        console.log("Current property: ", toCheck.currentCondition);
        var keys = Object.keys(toCheck.selected.conditions);
        console.log("Selected : ", toCheck.selected);
        setupKeys(keys);
        var questionKey = keys[toCheck.currentCondition];
        var questionObject = toCheck.selected.conditions[questionKey];
        console.log(
          "Questions set \n Question key: ",
          questionKey,
          ", Expected value: ",
          questionObject,
          "\n\n\n"
        );
        setCurrentProperty({ key: questionKey, value: questionObject });
      } else {
        const old = { ...toCheck, solved: true };
        setToCheck((oldObj) => old);
      }
    }
  }, [toCheck.currentCondition]);

  useEffect(() => {
    if (toCheck.solved) {
      console.log("Solved");
    }
  }, [toCheck.solved]);

  const renderQuestion = (cond) => {
    setQuestion(cond.question);
    var q = (
      <>
        <div className="titleFoot">please , select one of these options :</div>
        <div className="questionsSet">
          <div
            className="possibleResponse"
            onClick={() => chooseRes(cond.hot ? 1 : 2)}
          >
            YES
          </div>
          <div
            className="possibleResponse"
            onClick={() => chooseRes(!cond.hot ? 1 : 2)}
          >
            NO
          </div>
          {cond.idk && (
            <div className="possibleResponse" onClick={() => chooseRes(3)}>
              I don't know
            </div>
          )}
        </div>
      </>
    );
    return q;
  };

  const [questions, setQuestions] = useState(<></>);
  useEffect(() => {
    if (currentProperty.key) {
      var cond = Conditions[currentProperty.key];
      console.log("conditon selected : ", cond);
      setQuestions(renderQuestion(cond));
    }
  }, [currentProperty]);

  const doTheMath = () => {
    const response = userResponse;
    console.log("response  :  ", response);
    setUserResponse(-1);
    console.log("cureent Prop", currentProperty);

    // setAnswerdQuestions();
    // setCurrentProperty({
    //   key: null,
    //   value: 0,
    //   answserd: false,
    //   response: "",
    // });
    // setUserResponse("");
  };

  useEffect(() => {
    if (userResponse !== -1) {
      doTheMath();
    }
  }, [userResponse]);
  return (
    <>
      <div className="chat-container">
        <div className="titleCH  rainbow-text">Backward Chaining</div>
        <div className="chat-history">
          <div className="questionsTable">
            {toCheck.setted && (
              <div className={"quest-message user-message"}>
                <div className="userName">
                  <Logo type={2} />
                  You
                </div>
                <span className="message-content">{mainQuestion}</span>
              </div>
            )}
            <div className="question" ref={questionDiv}>
              {question}
            </div>
            {starting ? (
              <>
                <div className="titleFoot">
                  please , select one of these options :
                </div>
                <div className="questionsSet">
                  {Object.keys(Conditions).map(
                    (key) =>
                      Conditions[key].complex && (
                        <div
                          key={key}
                          className="possibleResponse"
                          onClick={() => startCheck(Conditions[key], key)}
                        >
                          {Conditions[key].question}
                        </div>
                      )
                  )}
                </div>
              </>
            ) : (
              questionnaire && <>{questions}</>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <div className="footer">
          <p>
            WeatherBot can make mistakes. Consider checking important
            information.
          </p>
        </div>
      </div>
    </>
  );
};

export default YesNo;
