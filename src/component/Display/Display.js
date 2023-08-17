import PropTypes from "prop-types";
import "./Display.css";

function Display({ displayId }) {
  return (
    <div className="display-container">
      <div id={displayId}>display</div>
    </div>
  );
}

Display.propTypes = {
  displayId: PropTypes.string.isRequired,
};

export default Display;
