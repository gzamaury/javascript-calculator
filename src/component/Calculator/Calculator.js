import { useState, useEffect } from "react";
import icons from "../Key/icons";
import Key from "../Key/Key";
import Display from "../Display/Display";
import "./Calculator.css";
import {
  isPoint,
  isZero,
  isEqOperator,
  isAnOperator,
  isANumberOrPoint,
  isMultiOrDivOperator,
  isAddOperator,
  isSubtractOperator,
} from "./utils/validators";
import {
  removeLeadingZeros,
  removeTrailingZeros,
  concatCharToLastElem,
  removeTrailingZerosFromLastElem,
  calculateOperation,
  triggerVibration,
} from "./utils/helpers";

function Calculator() {
  const [currentInput, setCurrentInput] = useState(["0"]);
  const [prevResult, setPrevResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleKeyPress = (keyChar) => {
    triggerVibration();
    setCurrentInput((prevInput) => handleInput(prevInput, keyChar));
  };

  useEffect(() => {
    if (prevResult !== null) {
      setHistory((prevHistory) => {
        const lastHistoryEntry = prevHistory[prevHistory.length - 1];

        if (
          !lastHistoryEntry ||
          lastHistoryEntry.join("") !== currentInput.join("")
        ) {
          return [...prevHistory, currentInput];
        }

        return [...prevHistory];
      });
    }
  }, [prevResult, currentInput]);

  const handleClearDisplay = () => {
    triggerVibration();
    if (showHistory) {
      setHistory([]);
      setShowHistory(false);
    } else {
      setCurrentInput(["0"]);
      setPrevResult(null);
      setHistory(history);
    }
  };

  const handleToggleHistory = () => {
    triggerVibration();
    setShowHistory((prevShowHistory) => !prevShowHistory);
  };

  const handleHistoryResult = (result) => {
    triggerVibration();
    setShowHistory(false); // Always close history

    setCurrentInput((prevInput) => {
      // Case 1: A previous result is being shown. Start a new calculation.
      if (prevResult !== null) {
        setPrevResult(null);
        return [result];
      }

      const lastElem = prevInput[prevInput.length - 1];

      // Case 2: Input is '0'. Replace it with the result.
      if (prevInput.length === 1 && lastElem === "0") {
        return [result];
      }

      // Case 3: Last input is an operator. Append the result.
      if (isAnOperator(lastElem)) {
        // If the last operator is '-' and the result is negative, wrap in parentheses.
        if (isSubtractOperator(lastElem) && result.startsWith("-")) {
          return [...prevInput, `(${result})`];
        }
        return [...prevInput, result];
      }

      // Case 4: Last input is a number. Do nothing, as requested.
      return prevInput;
    });
  };

  function handleInput(prevInput, keyChar) {
    if (isANumberOrPoint(keyChar)) {
      return handleNumberOrPoint(prevInput, keyChar);
    }

    if (isAnOperator(keyChar)) {
      return handleOperator(prevInput, keyChar);
    }

    if (isEqOperator(keyChar)) {
      return handleEqualOperator(prevInput, keyChar);
    }

    return [...prevInput, keyChar];
  }

  function handleNumberOrPoint(prevInput, keyChar) {
    let inputArray = prevInput.slice();

    // when there is a previus result
    if (prevResult !== null) {
      inputArray = ["0"];
      setPrevResult(null);
    }

    const lastElem = inputArray[inputArray.length - 1];

    // The initial - can be replace only by 0
    if (
      isZero(keyChar) &&
      inputArray.length === 1 &&
      isSubtractOperator(lastElem)
    ) {
      return [keyChar];
    }

    // after the initial - can be concatenated a .
    if (
      isPoint(keyChar) &&
      inputArray.length === 1 &&
      isSubtractOperator(lastElem)
    ) {
      return [lastElem, keyChar];
    }

    if (isAnOperator(lastElem)) {
      return [...inputArray, keyChar];
    }

    return concatCharToLastElem(inputArray, keyChar);
  }

  function handleOperator(prevInput, keyChar) {
    let inputArray = prevInput.slice();

    if (prevResult !== null) {
      inputArray = [...prevResult];
      setPrevResult(null);
    }

    let lastElem = inputArray[inputArray.length - 1];
    let beforeLastElem =
      inputArray.length > 1 ? inputArray[inputArray.length - 2] : "";

    // the initial - or . can't be replaced by * / or +
    if (
      (isMultiOrDivOperator(keyChar) || isAddOperator(keyChar)) &&
      inputArray.length === 1 &&
      (isSubtractOperator(lastElem) || removeTrailingZeros(lastElem) === "")
    ) {
      return [lastElem];
    }

    // the initial -. or -.0+ can't be replaced by * / or +
    if (
      (isMultiOrDivOperator(keyChar) || isAddOperator(keyChar)) &&
      inputArray.length === 2 &&
      removeTrailingZeros(lastElem) === "" &&
      isSubtractOperator(beforeLastElem)
    ) {
      return [...inputArray];
    }

    inputArray = removeTrailingZerosFromLastElem(inputArray);
    lastElem = inputArray[inputArray.length - 1];
    beforeLastElem =
      inputArray.length > 1 ? inputArray[inputArray.length - 2] : "";

    // the initial zero can be replaced for a subtract operator
    if (
      isZero(lastElem) &&
      inputArray.length === 1 &&
      isSubtractOperator(keyChar)
    ) {
      return [keyChar];
    }

    // elem before last is * or /
    // and last element is - operator
    // and char is not - operator
    if (
      isMultiOrDivOperator(beforeLastElem) &&
      isSubtractOperator(lastElem) &&
      !isSubtractOperator(keyChar)
    ) {
      // replace *- or /- with any + * / operator
      return [...inputArray.slice(0, -2), keyChar];
    }

    // the last element is + - * / operator and char is not - operator
    if (
      (isAnOperator(lastElem) && !isSubtractOperator(keyChar)) ||
      ((isAddOperator(lastElem) || isSubtractOperator(lastElem)) &&
        isSubtractOperator(keyChar))
    ) {
      // replace + - * / with any + * / operator
      // or replace + - with - operator
      return [...inputArray.slice(0, -1), keyChar];
    }

    return [...inputArray, keyChar];
  }

  function handleEqualOperator(prevInput, keyChar) {
    let inputArray = prevInput.slice();
    const firstElem = inputArray[0];
    let lastElem = inputArray[inputArray.length - 1];
    let beforeLastElem =
      inputArray.length > 1 ? inputArray[inputArray.length - 2] : "";

    // removes last and before last elems if last is .0 and before last is an operator
    if (
      removeTrailingZeros(lastElem) === "" &&
      isSubtractOperator(beforeLastElem) &&
      inputArray.length > (firstElem.startsWith("-") ? 5 : 4)
    ) {
      inputArray = inputArray.slice(0, -2);
      lastElem = inputArray[inputArray.length - 1];
      beforeLastElem =
        inputArray.length > 1 ? inputArray[inputArray.length - 2] : "";
    }

    // removes last elem if is an operator
    if (
      isSubtractOperator(lastElem) &&
      isAnOperator(beforeLastElem) &&
      inputArray.length > (firstElem.startsWith("-") ? 4 : 3)
    ) {
      inputArray = inputArray.slice(0, -2);
      lastElem = inputArray[inputArray.length - 1];
    }

    // removes last and before last elems if both are operators
    if (
      isAnOperator(lastElem) &&
      inputArray.length > (firstElem.startsWith("-") ? 4 : 3)
    ) {
      inputArray = inputArray.slice(0, -1);
      lastElem = inputArray[inputArray.length - 1];
    }

    // control when an operation is not valid
    if (
      inputArray.length <= 2 ||
      isAnOperator(lastElem) ||
      removeTrailingZeros(lastElem) === "" ||
      prevResult !== null
    ) {
      return [...inputArray];
    }

    inputArray = removeTrailingZerosFromLastElem(inputArray);

    const result = removeLeadingZeros(
      String(calculateOperation(inputArray.join("")))
    );

    // (?<=-) is a positive lookbehind that matches a position preceded by a minus sign.
    // (?=\d|\.) is a positive lookahead that matches a position followed by a digit (\d)
    //  or a decimal point (\.)
    // split(/(?<=-)(?=\d)/) will split the string at the position where the minus sign and
    //  the number meet, resulting in two separate strings.
    setPrevResult(result.split(/(?<=-)(?=\d|\.)/));

    return [...inputArray, `${keyChar}${result}`];
  }

  const handleBackspace = () => {
    triggerVibration();
    setCurrentInput((prevInput) => {
      const lastElem = prevInput[prevInput.length - 1];

      if (prevInput.length <= 1 && lastElem.length === 1) {
        return ["0"];
      }

      if (lastElem.length === 1) {
        return [...prevInput.slice(0, -1)];
      }

      return [...prevInput.slice(0, -1), lastElem.slice(0, -1)];
    });
  };

  return (
    <div className="cal-container">
      <div id="calculator">
        <div id="display-section">
          <Display
            displayId="display"
            history={history}
            currentInput={currentInput}
            clearDisplay={handleClearDisplay}
            showHistory={showHistory}
            toggleHistory={handleToggleHistory}
            backspace={handleBackspace}
            isPrevResult={prevResult !== null}
            onHistoryResultClick={handleHistoryResult}
          />
        </div>
        <div id="kb-left" className="kb-section">
          <Key
            keyId="seven"
            icon={icons.seven}
            keyChar="7"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="eight"
            icon={icons.eight}
            keyChar="8"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="four"
            icon={icons.four}
            keyChar="4"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="five"
            icon={icons.five}
            keyChar="5"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="one"
            icon={icons.one}
            keyChar="1"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="two"
            icon={icons.two}
            keyChar="2"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="zero"
            icon={icons.zero}
            keyChar="0"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="decimal"
            icon={icons.decimal}
            keyChar="."
            className="key"
            onClick={handleKeyPress}
          />
        </div>
        <div id="kb-right" className="kb-section">
          <Key
            keyId="nine"
            icon={icons.nine}
            keyChar="9"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="divide"
            icon={icons.divide}
            keyChar="/"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="six"
            icon={icons.six}
            keyChar="6"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="multiply"
            icon={icons.multiply}
            keyChar="*"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="three"
            icon={icons.three}
            keyChar="3"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="subtract"
            icon={icons.subtract}
            keyChar="-"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="add"
            icon={icons.add}
            keyChar="+"
            className="key"
            onClick={handleKeyPress}
          />
          <Key
            keyId="equals"
            icon={icons.equals}
            keyChar="="
            className="key"
            onClick={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}
export default Calculator;
