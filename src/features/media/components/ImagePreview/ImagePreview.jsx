import { FiX, FiCheck } from "react-icons/fi";

import "./ImagePreview.css";

const ImagePreview = ({
  open,
  image,
  onCancel,
  onUse,
}) => {

  if (!open || !image) return null;

  return (
    <div className="preview-overlay">

      {/* Header */}

      <div className="preview-header">

        <button
          onClick={onCancel}
        >
          <FiX />
        </button>

        <h3>Preview</h3>

        <button
          onClick={onUse}
        >
          <FiCheck />
        </button>

      </div>

      {/* Image */}

      <div className="preview-body">

        <img
          src={image}
          alt="Preview"
          className="preview-image"
        />

      </div>

    </div>
  );
};

export default ImagePreview;