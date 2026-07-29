import { FiArrowLeft, FiCamera, FiUser, FiInfo, FiMail, FiEdit2, } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateUserName, updateUserAbout, updateProfilePhoto } from "../services/profileService";
import { setUser } from "../../auth/store/authSlice";
import ImageCropper from "../../media/components/ImageCropper/ImageCropper";
import ImagePreview from "../../media/components/ImagePreview/ImagePreview";

import "../styles/profile.css";

const Profile = () => {

  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const [croppedImage, setCroppedImage] = useState(null);

  const [cropOpen, setCropOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [previewOpen, setPreviewOpen] = useState(false);

  const [editingField, setEditingField] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);  

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      about: user?.about || "Hey there! I am using ReactChat.",
    });
  }, [user]);

  const handleEditName = () => {
    setEditingField("name");
  };

  const handleEditAbout = () => {
    setEditingField("about");
  };

  const handleChangePhoto = () => {
    // Next Step
  };

  const handleImageSelect = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);

    setCropOpen(true);

    e.target.value = "";
  };

  const handleCropCancel = () => {

    
    setSelectedImage(null);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setCropOpen(false);
  };  

  const handleCropDone = (
    image
  ) => {

    setCropOpen(false);

    setSelectedImage(null);

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setCroppedImage(image);

    setPreviewOpen(true);

  };

  const handlePreviewCancel = () => {

      setPreviewOpen(false);

      setCroppedImage(null);

  };

  const handleUsePhoto = async () => {

      try{

          setLoading(true);

          await updateProfilePhoto(
              user.uid,
              croppedImage
          );

          dispatch(
              setUser({
                  ...user,
                  photoURL: croppedImage,
              })
          );

          setPreviewOpen(false);

          setCroppedImage(null);

      }
      catch(error){

          console.error(error);

      }
      finally{

          setLoading(false);

      }

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSave = async () => {

    if (loading) return;

    try {

      setLoading(true);

      if (editingField === "name") {

        await updateUserName(
          user.uid,
          formData.name.trim()
        );

        dispatch(
          setUser({
            ...user,
            name: formData.name.trim(),
          })
        );

      }

      if (editingField === "about") {

        await updateUserAbout(
          user.uid,
          formData.about.trim()
        );

        dispatch(
          setUser({
            ...user,
            about: formData.about.trim(),
          })
        );

      }

      setEditingField(null);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="profile-page">

      {/* Header */}

      <div className="profile-header">

        <button
          className="profile-back-btn"
          onClick={() => navigate("/settings")}
          aria-label="Back"
        >
          <FiArrowLeft />
        </button>

        <h2>Profile</h2>

      </div>
      
      {/* Profile Photo */}

      <div className="profile-image-section">
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          hidden 
          onChange={handleImageSelect}
        />

        <div className="profile-image">

          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
            />
          ) : (
            <span>
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          )}
          <button
            className="camera-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <FiCamera />
          </button>

        </div>

      </div>

      {/* Profile Information */}

      <div className="profile-list">

        {/* Name */}

        <div
          className="profile-row"
          onClick={handleEditName}
        >

          <FiUser className="row-icon" />

          <div className="row-body">

            <label>Name</label>

            {
            editingField === "name" ? (
              <input
                className="edit-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
            ) : (
              <p className="row-value">
                {user?.name}
              </p>
            )
            }

          </div>

          {
          editingField === "name" ? (
          
          <button
              className="save-btn"
              onClick={handleSave}
          >
              {loading ? "Saving..." : "Save"}
          </button>

          ) : (
          
          <FiEdit2
              className="row-edit"
              onClick={() =>
                  setEditingField("name")
              }
          />
            
          )
          }

        </div>

        {/* About */}

        <div
          className="profile-row"
          onClick={handleEditAbout}
        >

          <FiInfo className="row-icon" />

          <div className="row-body">

            <label>About</label>

            {
            editingField === "about" ? (
            
            <input
                className="edit-input"
                name="about"
                value={formData.about}
                onChange={handleChange}
                autoFocus
            />
            
            ) : (
            
            <p className="row-value">
            
                {user?.about ||
                 "Hey there! I am using ReactChat."}

            </p>

            )
            }

          </div>

          {
          editingField === "about" ? (
          
          <button
              className="save-btn"
              onClick={handleSave}
          >
              {loading ? "Saving..." : "Save"}
          </button>
          
          ) : (
          
          <FiEdit2
              className="row-edit"
              onClick={() =>
                  setEditingField("about")
              }
          />

          )
          }

        </div>

        {/* Email */}

        <div className="profile-row">

          <FiMail className="row-icon" />

          <div className="row-body">

            <label>Email</label>

            <p className="row-value">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

      <p className="profile-hint">
        This information is visible to your contacts on
        ReactChat.
      </p>
      <ImageCropper
        open={cropOpen}
        image={selectedImage}
        onCancel={handleCropCancel}
        onDone={handleCropDone}
      />
      <ImagePreview
          open={previewOpen}
          image={croppedImage}
          onCancel={handlePreviewCancel}
          onUse={handleUsePhoto}
      />

    </div>
  );
};

export default Profile;