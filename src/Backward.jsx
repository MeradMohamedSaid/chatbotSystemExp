import { Fragment, useState, useRef, useEffect } from "react";
import "./YesNo.css";

import { FaArrowTurnUp } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import Logo from "./logo";

import Typewriter from "./TypeWrited";

const Backward = () => {
  const [Conditions, setConditions] = useState({
    temperature: {
      question: "Is the current temperature considered high?",
      conditions: {
        temperature: 1,
      },
      complex: false,
      idk: false,
      hot: true,
    },
    sky: {
      question: "Are there any clouds visible in the sky?",
      conditions: {
        sky: 0,
      },
      complex: false,
      idk: false,
      hot: false,
    },
    wind: {
      question: "Is there noticeable wind activity?",
      conditions: {
        wind: 0,
      },
      complex: false,
      idk: false,
      hot: false,
    },
    rain: {
      question: "Is there a chance of Rainfall?",
      conditions: {
        sky: 0,
      },
      complex: true,
      idk: true,
      hot: false,
    },
    snow: {
      question: "Is there a possibility of snowfall?",
      conditions: {
        sky: 0,
        temperature: 0,
      },
      complex: true,
      idk: true,
      hot: false,
    },
    heatwave: {
      question: "Is there any potential for a heatwave occurrence?",
      conditions: {
        wind: 0,
        temperature: 1,
      },
      complex: true,
      idk: false,
      hot: true,
    },
    storm: {
      question: "Is there any risk of a storm developing?",
      conditions: {
        wind: 0,
        rain: 0,
      },
      complex: true,
      idk: true,
      hot: false,
    },
    flooding: {
      question: "Is there any risk of flooding?",
      conditions: {
        storm: 0,
      },
      complex: true,
      idk: false,
      hot: false,
    },
  });
  const [mainQuestion, setMainQuestion] = useState("Your Question");

  const [toCheck, setToCheck] = useState({
    solved: false,
    setted: false,
  });
  const [starting, setStarting] = useState(true);

  const [question, setQuestion] = useState(
    "What weather would you like to check?"
  );
  const [questions, setQuestions] = useState(<></>);

  const questionDiv = useRef(null);
  const messagesEndRef = useRef(null);
  const questiTable = useRef(null);

  const [currentProperty, setCurrentProperty] = useState(null);

  const [keysToCheck, setKeysToCheck] = useState({ table: [], current: null });
  const [keysSetups, setKeysSetups] = useState(false);
  const [finalResultTable, setFinalResultTable] = useState([]);
  const [showResult, setShowResult] = useState(false);

  /*_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_*/

  const [userResponse, setUserResponse] = useState(-1);
  const chooseRes = (res) => {
    if (res === 1) setUserResponse((old) => 1); //hot
    else if (res === 2) setUserResponse((old) => 0); //cold
    else if (res === 3) setUserResponse((old) => 3); //idk
    else return;
  };

  /*_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_*/

  const modifyQuestion = (newQuestion) => {
    setQuestion(newQuestion);
    setUserResponse((old) => -1);
  };

  const startCheck = async (object, key) => {
    var old = toCheck;
    if (!toCheck.setted) {
      old = { ...old, object, setted: true };
      setToCheck((oldOj) => old);
      console.log("the object : ", object);
      await setStarting(false);
      setMainQuestion(object.question);
      var keys = Object.keys(object.conditions);
      console.log("Construction Keys: ", keys);
      setupKeys(keys, object.conditions);
      console.log("Object setted : ", object);
      console.log("object : ", old);
      console.log("key : ", key);
    }
  };

  const setupKeys = (keys, conditions) => {
    if (keysSetups) return;
    var table = [];
    var obj;
    console.log("Conditons : ", conditions);
    keys.forEach((key, index) => {
      console.log("key : ", key);
      if (Conditions[key].complex) {
        var newkeys = Object.keys(Conditions[key].conditions);
        console.log("Key Complex");
        newkeys.forEach((keye) => {
          if (Conditions[keye].complex) {
            var nnkeys = Object.keys(Conditions[keye].conditions);
            nnkeys.forEach((keyee) =>
              table.push({
                key: keyee,
                // expected: Conditions[key].conditions[keye],
                expected: Conditions[keye].conditions[keyee],
                valid: false,
                checked: false,
              })
            );
          } else {
            table.push({
              key: keye,
              // expected: Conditions[key].conditions[keye],
              expected: Conditions[key].conditions[keye],
              valid: false,
              checked: false,
            });
          }
        });
      } else {
        table.push({
          key: key,
          expected: conditions[key],
          valid: false,
          checked: false,
        });
      }
    });
    console.log(table);
    var objc = { table: table, current: 0 };
    setKeysToCheck((old) => objc);
    setKeysSetups((old) => true);
  };

  const controllQuestions = async () => {
    console.log("keys?table: ", keysToCheck);
    var table = keysToCheck.table[keysToCheck.current];
    return table;
  };

  useEffect(() => {
    const useEffectFun = async () => {
      if (keysToCheck.current !== null) {
        const obj = await controllQuestions();
        console.log("CtrlQuestions : ", obj);
        setCurrentProperty((old) => obj);
      }
    };
    useEffectFun();
  }, [keysToCheck.current]);

  const renderQuestion = (cond) => {
    modifyQuestion(cond.question);
    var q = (
      <>
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
      </>
    );
    questiTable.current.style.display = "none";
    new Promise((resolve) => {
      setTimeout(() => {
        questiTable.current.style.display = "block";
      }, 100);
      resolve();
    });
    return q;
  };

  useEffect(() => {
    if (currentProperty !== null) {
      if (currentProperty.checked) {
        var cur = keysToCheck.current + 1;
        setFinalResultTable((old) => [...old, currentProperty]);
        if (cur === keysToCheck.table.length) {
          setShowResult((old) => true);
        } else {
          setKeysToCheck((old) => {
            return { ...old, current: cur };
          });
        }
      } else {
        var cond = Conditions[currentProperty.key];
        console.log("currentProperty.key", currentProperty);
        console.log("conditon selected : ", cond);
        setQuestions(renderQuestion(cond));
      }
    }
  }, [currentProperty]);

  useEffect(() => {
    if (userResponse !== -1) {
      console.log("userResponse Updated");
      if (userResponse === currentProperty.expected) {
        console.log("Valid");

        setCurrentProperty((old) => {
          return { ...old, checked: true, valid: true };
        });
      } else {
        console.log("UnValid");

        setCurrentProperty((old) => {
          return { ...old, checked: true };
        });
      }
    }
  }, [userResponse]);
  const [result, setResult] = useState("");
  useEffect(() => {
    if (showResult) {
      var check = true;
      var res =
        "Greetings! I'm here to address your inquiry and fulfill your curiosity. Earlier, I presented you with a series of queries to which you responded with affirmative and negative replies. Let's now revisit and analyze your responses together.#let's systematically assess each query and its corresponding response:";
      console.log("Final Table : ", finalResultTable);
      finalResultTable.forEach((row) => {
        res += "@ Query regarding the status of " + row.key;
        if (!row.checked || !row.valid) {
          res += " => Your response does not follow the rules Set.";
          check = false;
        } else {
          res += " => your answer matches the rules";
        }
      });
      res +=
        '#Regarding your initial question, which was: "' +
        mainQuestion.slice(0, -1) +
        '" , the assessment is: ' +
        (check
          ? "[ Affirmative, this scenario is possible ]."
          : "[ Negative, this scenario is unlikely to occur ].");
      console.log(res);
      setResult(res);
    }
  }, [showResult]);

  return (
    <>
      <div className="chat-container">
        <div className="titleCH  rainbow-text">Backward Chaining</div>
        <div className="chat-history">
          {!showResult ? (
            <div className="questionsTable" ref={questiTable}>
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
              <div className="questionsSet">
                {starting ? (
                  <>
                    <div className="titleFoot">
                      please , select one of these options :
                    </div>
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
                  </>
                ) : (
                  <>
                    <div className="titleFoot">
                      please , select one of these options :
                    </div>
                    {questions}
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="result-div">
                <div className={"quest-message user-message"}>
                  <div className="userName">
                    <Logo type={2} />
                    You
                  </div>
                  <span className="message-content">{mainQuestion}</span>
                </div>
                <div className={"quest-message weather-message"}>
                  <div className="userName">
                    <Logo type={1} />
                    Weather Predictor
                  </div>
                  <span className="message-content">
                    <Typewriter message={result} />
                  </span>
                </div>
              </div>
            </>
          )}
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

export default Backward;
