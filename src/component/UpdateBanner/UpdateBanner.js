import PropTypes from "prop-types";
import "./UpdateBanner.css";

function UpdateBanner({ onUpdate }) {
  return (
    <div className="update-banner">
      <p>Hay una nueva versión disponible.</p>
      <button type="button" onClick={onUpdate}>
        Actualizar
      </button>
    </div>
  );
}

UpdateBanner.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateBanner;
