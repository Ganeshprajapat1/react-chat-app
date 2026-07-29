import { useState } from "react";
import Cropper from "react-easy-crop";
import { FiArrowLeft, FiCheck } from "react-icons/fi";

import { getCroppedImage } from "../../utils/getCroppedImage";

import "./ImageCropper.css";

const ImageCropper = ({
  image,
  open,
  onCancel,
  onDone,
}) => {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const onCropComplete = (
    _,
    croppedPixels
  ) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleDone = async () => {
    try {
      setLoading(true);

      const croppedImage =
        await getCroppedImage(
          image,
          croppedAreaPixels
        );

      onDone(croppedImage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!open || !image) return null;

  return (
    <div className="cropper-overlay">

      {/* Header */}

      <div className="cropper-header">

        <button
          className="cropper-icon-btn"
          onClick={onCancel}
        >
          <FiArrowLeft />
        </button>

        <h3>Edit Photo</h3>

        <button
          className="cropper-icon-btn done"
          onClick={handleDone}
          disabled={loading}
        >
          <FiCheck />
        </button>

      </div>

      {/* Crop */}

      <div className="cropper-container">

        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          objectFit="contain"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />

      </div>

      {/* Zoom */}

      <div className="zoom-container">

        <span>-</span>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) =>
            setZoom(
              Number(e.target.value)
            )
          }
        />

        <span>+</span>

      </div>

    </div>
  );
};

export default ImageCropper;