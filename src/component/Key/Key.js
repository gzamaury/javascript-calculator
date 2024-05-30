import PropTypes from "prop-types";
import "./Key.css";

function Key({ keyId, icon, keyChar, onKeyUp }) {
  return (
    <div className="key-container">
      <button
        id={keyId}
        onKeyUp={onKeyUp}
        className="key hidden-text"
        type="button"
      >
        {keyChar}
        <img src={icon} alt="icon" className="icon" />
      </button>
    </div>
  );
}

Key.propTypes = {
  keyId: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  keyChar: PropTypes.string.isRequired,
  onKeyUp: PropTypes.func.isRequired,
};

export default Key;
