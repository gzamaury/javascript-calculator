import PropTypes from "prop-types";
import "./Display.css";

function Display({ displayId }) {
  return (
    <div className="display-container">
      <div id={displayId} className="display">
        <div id="dsp-main" className="dsp-main">
          main
        </div>
        <div id="dsp-bar-btn" className="dsp-bar-btn">
          <div id="clear" className="bar-btn-item bar-btn-disabled">
            CLR
          </div>
        </div>
      </div>
    </div>
  );
}

Display.propTypes = {
  displayId: PropTypes.string.isRequired,
};

export default Display;
