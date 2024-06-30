import { useState } from "react";
import icons from "../Key/icons";
import Key from "../Key/Key";
import Display from "../Display/Display";
import "./Calculator.css";
import {
  isEqOperator,
  isAnOperator,
  isANumberOrPoint,
  isMultiOrDivOperator,
  isAddOperator,
  isSubtractOperator,
} from "./utils/validators";
import {
  concatCharToLastElem,
  removeTrailingZerosFromLastElem,
  calculateOperation,
} from "./utils/helpers";

function Calculator() {
  const [currentInput, setCurrentInput] = useState(["0"]);
  const [prevResult, setPrevResult] = useState(null);

  const handleKeyPress = (keyChar) => {
    setCurrentInput((prevInput) => handleInput(prevInput, keyChar));
  };

  const handleClearDisplay = () => {
    setCurrentInput(["0"]);
    setPrevResult(null);
  };

  function handleInput(prevInput, keyChar) {
    const lastElem = prevInput[prevInput.length - 1];

    if (isANumberOrPoint(keyChar)) {
      return handleNumberOrPoint(prevInput, lastElem, keyChar);
    }

    if (isAnOperator(keyChar)) {
      return handleOperator(prevInput, keyChar);
    }

    if (isEqOperator(keyChar)) {
      return handleEqualOperator(prevInput, keyChar);
    }

    return [...prevInput, keyChar];
  }

  function handleNumberOrPoint(prevInput, lastElem, keyChar) {
    if (isAnOperator(lastElem)) {
      return [...prevInput, keyChar];
    }

    return concatCharToLastElem(prevInput, keyChar);
  }

  function handleOperator(prevInput, keyChar) {
    let inputArray = prevInput.slice();

    if (prevResult !== null) {
      inputArray = [prevResult];
      setPrevResult(null);
    }

    inputArray = removeTrailingZerosFromLastElem(inputArray);
    const lastElem = inputArray[inputArray.length - 1];
    const beforeLastElem =
      inputArray.length > 1 ? inputArray[inputArray.length - 2] : "";

    if (inputArray.length < 1) {
      return [...inputArray];
    }

    // elem before last is * or /
    // and last element is - operator
    // and char is not - operator
    if (
      isMultiOrDivOperator(beforeLastElem) &&
      isSubtractOperator(lastElem) &&
      !isSubtractOperator(keyChar)
    ) {
      // replace *- or /- with any +*/ operator
      return [...inputArray.slice(0, -2), keyChar];
    }

    // last element is +-*/ operator and char is not - operator
    if (
      (isAnOperator(lastElem) && !isSubtractOperator(keyChar)) ||
      ((isAddOperator(lastElem) || isSubtractOperator(lastElem)) &&
        isSubtractOperator(keyChar))
    ) {
      // replace +-*/ with any +*/ operator
      // or replace +- with any - operator
      return [...inputArray.slice(0, -1), keyChar];
    }

    return [...inputArray, keyChar];
  }

  function handleEqualOperator(prevInput, keyChar) {
    const result = calculateOperation(prevInput.join(""));
    setPrevResult(String(result));

    return [...prevInput, `${keyChar}${result}`];
  }

  return (
    <div className="cal-container">
      <div id="calculator">
        <div id="display-section">
          <Display
            displayId="display"
            history={[[]]}
            currentInput={currentInput}
            clearDisplay={handleClearDisplay}
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
