import "../../styles/ImagePreview.css";

const ImagePreview = ({
  image,
  caption,
  setCaption,
  onCancel,
  onSend,
}) => {
  if (!image) return null;

  return (
    <div className="image-preview-overlay">
      <div className="image-preview-container">

        <img
          src={image}
          alt="Preview"
          className="preview-image"
        />

        <input
          type="text"
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className="preview-buttons">
          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="send-btn"
            onClick={onSend}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default ImagePreview;