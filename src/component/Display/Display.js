import { useState } from "react";
import PropTypes from "prop-types";
import { buildOperation, buildHistory } from "./operationBuilder";
import "./Display.css";

function Display({
  displayId,
  history = [[]],
  currentInput = ["0"],
  clearDisplay,
}) {
  const [showHistory, setShowHistory] = useState(false);
  const isHistoryEmpty = history.length === 0 || history[0].length < 1;
  const historyBtnClass = isHistoryEmpty
    ? " bar-btn-disabled"
    : " bar-btn-enabled";
  const isDisplayEmpty = currentInput.toString() === ["0"].toString();
  const clearBtnClass = isDisplayEmpty
    ? " bar-btn-disabled"
    : " bar-btn-enabled";
  const displayOutput = showHistory
    ? buildHistory(history)
    : buildOperation(currentInput);

  const handleClickHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="display-container" data-testid="display">
      <div className="display">
        <div id={displayId} className="dsp-main">
          <div id="dsp-content" className="dsp-content">
            {displayOutput}
          </div>
        </div>
        <div id="dsp-bar-btn" className="dsp-bar-btn">
          <button
            id="clear"
            className={`bar-btn-item${clearBtnClass}`}
            type="button"
            disabled={isDisplayEmpty}
            onClick={clearDisplay}
          >
            CLR
          </button>
          <button
            id="history"
            name="history"
            className={`bar-btn-item${historyBtnClass}`}
            onClick={handleClickHistory}
            onKeyUp={handleClickHistory}
            type="button"
            disabled={isHistoryEmpty}
          >
            {!showHistory ? "HISTORY" : "CLOSE HISTORY"}
          </button>
        </div>
      </div>
    </div>
  );
}

Display.propTypes = {
  displayId: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  currentInput: PropTypes.arrayOf(PropTypes.string).isRequired,
  clearDisplay: PropTypes.func.isRequired,
};

export default Display;
