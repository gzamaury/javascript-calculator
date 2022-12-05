import PropTypes from "prop-types";
import "./Key.css";

function Key({ keyId, icon, keyChar }) {
  return (
    <div className="key-container">
      <div keyId={keyId} className="key">
        <img src={icon} alt="icon" className="icon" />
        <span className="hidden">{keyChar}</span>
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
