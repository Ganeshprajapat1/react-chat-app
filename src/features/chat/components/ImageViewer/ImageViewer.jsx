import { FiX, FiDownload } from "react-icons/fi";
import "../../styles/ImageViewer.css";

const ImageViewer = ({ image, onClose }) => {
  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `ReactChat-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-viewer-overlay">

      <div className="viewer-header">

        <button
          className="viewer-btn"
          onClick={onClose}
        >
          <FiX />
        </button>

        <button
          className="viewer-btn"
          onClick={handleDownload}
        >
          <FiDownload />
        </button>

      </div>

      <div className="viewer-body">
        <img
          src={image}
          alt="Preview"
          className="viewer-image"
        />
      </div>

    </div>
  );
};

export default ImageViewer;