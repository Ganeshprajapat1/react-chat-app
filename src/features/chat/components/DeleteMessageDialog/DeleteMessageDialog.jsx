import "../../styles/deleteMessageDialog.css";

const DeleteMessageDialog = ({
  open,
  multiple,
  canDeleteForEveryone,
  onDeleteForEveryone,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div
      className="delete-dialog-overlay"
      onClick={onCancel}
    >
      <div
        className="delete-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>
          Delete {multiple ? "messages" : "message"}?
        </h3>

        <div className="delete-options">

          {canDeleteForEveryone && (
            <button
              onClick={onDeleteForEveryone}
            >
              Delete for everyone
            </button>
          )}

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteMessageDialog;