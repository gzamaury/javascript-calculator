/* eslint-disable no-console */
import icons from "../Key/icons";

export function buildHistory(history, onHistoryResultClick) {
  console.log("history:");
  console.log(history);
  const displayOutput = [];
  const copyHistory = history.slice().reverse();

  copyHistory.forEach((operation, i) => {
    const jsxOpElements = operation.map((element) => {
      switch (true) {
        case isAnOperand(element):
          return <span className="operand">{element}</span>;

        case isAnOperator(element):
          return <span className="symbol">{element}</span>;

        case starWithEq(element):
          return <span className="symbol">=</span>;

        default:
          return <span>{element}</span>;
      }
    });

    displayOutput.push(<div className="operation">{jsxOpElements}</div>);

    // verify if result is present in the operation
    const lastElement = operation[operation.length - 1];
    const lastElemStartWithEq = starWithEq(lastElement);
    if (lastElemStartWithEq) {
      const result = lastElement.slice(1);
      displayOutput.push(
        <div className="result">
          <button
            className="add-history-btn"
            type="button"
            onClick={() => onHistoryResultClick(result)}
          >
            <img src={icons.reuse} alt="Reutilizar resultado en la operación" />
          </button>
          {result}
        </div>
      );
    }

    if (history.length > 1 && i < history.length - 1) {
      displayOutput.push(<span className="separator" />);
    }
  });

  return displayOutput;
}

export function buildOperation(input) {
  const operation = [];
  const jsxOpElements = input.map((element) => {
    switch (true) {
      case isAnOperand(element):
        return <span className="operand">{element}</span>;

      case isAnOperator(element):
        return <span className="symbol">{element}</span>;

      case starWithEq(element):
        return <span className="symbol">=</span>;

      default:
        return <span>{element}</span>;
    }
  });

  operation.push(<div className="operation">{jsxOpElements}</div>);

  // verify if result is present in the operation
  const lastElement = input[input.length - 1];
  if (starWithEq(lastElement)) {
    const result = lastElement.slice(1);

    // Not showing operation, uncomment next line just for passing tests
    // operation = [];
    operation.push(<div className="result">{result}</div>);
  }

  return operation;
}

function isAnOperand(e) {
  return /^\d+(\.\d+)?$/.test(e);
}
function isAnOperator(element) {
  return /^[+\-*//]$/.test(element);
}
function starWithEq(element) {
  return /^=.+$/.test(element);
}
