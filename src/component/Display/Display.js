import PropTypes from "prop-types";
import { buildOperation, buildHistory } from "./operationBuilder";
import "./Display.css";

function Display({
  displayId,
  history = [[]],
  currentInput = ["0"],
  clearDisplay,
  showHistory,
  toggleHistory,
}) {
  const isHistoryEmpty = history.length === 0 || history[0].length < 1;
  const historyBtnClass = isHistoryEmpty
    ? " bar-btn-disabled"
    : " bar-btn-enabled";
  const isDisplayEmpty = currentInput.toString() === ["0"].toString();
  const clearBtnClassDisabled =
    (!showHistory && isDisplayEmpty) || (showHistory && isHistoryEmpty)
      ? " bar-btn-disabled"
      : " bar-btn-enabled";
  const displayOutput = showHistory
    ? buildHistory(history)
    : buildOperation(currentInput);

  let clearBtnText = "CLR";
  let historyBtnText = "HISTORY";
  let clerBtnDisabled = isDisplayEmpty;
  if (showHistory) {
    clearBtnText = "CLR HISTORY";
    historyBtnText = "CLOSE HISTORY";
    clerBtnDisabled = isHistoryEmpty;
  }

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
            className={`bar-btn-item${clearBtnClassDisabled}`}
            type="button"
            disabled={clerBtnDisabled}
            onClick={clearDisplay}
          >
            {clearBtnText}
          </button>
          <button
            id="history"
            name="history"
            className={`bar-btn-item${historyBtnClass}`}
            onClick={toggleHistory}
            onKeyUp={toggleHistory}
            type="button"
            disabled={isHistoryEmpty}
          >
            {historyBtnText}
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
  showHistory: PropTypes.bool.isRequired,
  toggleHistory: PropTypes.func.isRequired,
};

export default Display;
