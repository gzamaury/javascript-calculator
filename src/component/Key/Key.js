import PropTypes from "prop-types";
import "./Key.css";

function Key({ keyId, icon, keyChar }) {
  return (
    <div className="key-container">
      <div id={keyId} className="key hidden-text">
        {keyChar}
        <img src={icon} alt="icon" className="icon" />
      </div>
    </div>
  );
}

Key.propTypes = {
  keyId: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  keyChar: PropTypes.string.isRequired,
};

export default Key;
