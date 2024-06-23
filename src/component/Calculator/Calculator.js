/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import icons from "../Key/icons";
import Key from "../Key/Key";
import Display from "../Display/Display";
import "./Calculator.css";

function Calculator() {
  const [currentInput, setCurrentInput] = useState(["0"]);

  const handleKeyPress = (keyChar) => {
    setCurrentInput((prevOperation) => handleInput(prevOperation, keyChar));
  };

  function handleInput(prevInput, keyChar) {
    const lastElem = prevInput[prevInput.length - 1];

    switch (true) {
      case isANumberOrPoint(keyChar):
        if (isAnOperator(lastElem)) {
          return [...prevInput, keyChar];
        }

        return concatCharToLastElem(prevInput, keyChar);

      case isAnOperator(keyChar):
        return caseIsAnOperator(prevInput, keyChar);

      case isEqOperator(keyChar):
        return [...prevInput, calculateOperation(prevInput, keyChar)];

      default:
        return [...prevInput, keyChar];
    }
  }

  function calculateOperation(operation, keyChar) {
    // TODO
    return `${keyChar}result`;
  }

  function caseIsAnOperator(prevInput, keyChar) {
    const inputArray = removeTrailingZerosFromLastElem(prevInput);
    const lastElem = inputArray[inputArray.length - 1];

    if (inputArray.length < 1) {
      return [...prevInput];
    }

    // TODO: VERIFICAR QUE SE PERMITA NUMEROS NEGATIVOS (-)
    if (isAnOperator(lastElem)) {
      return [...inputArray.slice(0, -1), keyChar];
    }

    return [...inputArray, keyChar];
  }

  function concatCharToLastElem(inputArray, char) {
    const lastElem = inputArray[inputArray.length - 1];
    let newElement = removeLeadingZeros(lastElem + char);

    newElement = removeTrailingPoints(newElement);

    return [...inputArray.slice(0, -1), newElement];
  }

  function isANumberOrPoint(e) {
    return /^[\d.]$/.test(e);
  }
  function isAnOperator(element) {
    return /^[+\-*//]$/.test(element);
  }
  function isEqOperator(element) {
    return /=/.test(element);
  }
  function removeLeadingZeros(str) {
    const oneZeroStr = str.replace(/^0+/, "0");

    if (oneZeroStr.length <= 1) {
      return oneZeroStr;
    }

    return oneZeroStr.replace(/^0+/, "");
  }
  function removeTrailingZeros(str) {
    return str.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }
  function removeTrailingZerosFromLastElem(inputArray) {
    const lastElem = inputArray[inputArray.length - 1];
    if (removeTrailingZeros(lastElem) === "") {
      return [...inputArray.slice(0, -1)];
    }

    return [...inputArray.slice(0, -1), removeTrailingZeros(lastElem)];
  }
  function removeTrailingPoints(str) {
    return str.replace(/(\.\d*?)(\.)/, "$1");
  }

  return (
    <div className="cal-container">
      <div id="calculator">
        <div id="display-section">
          <Display
            displayId="display"
            history={[[]]}
            currentInput={currentInput}
            clearDisplay={() => setCurrentInput(["0"])}
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
