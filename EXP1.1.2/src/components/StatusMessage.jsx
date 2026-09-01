function StatusMessage({ status, onClose }) {
  if (!status) {
    return null;
  }

  return (
    <div
      className={`status-message ${status.type}`}
    >
      <span>
        {status.type === "success"
          ? "✓"
          : "⚠"}
      </span>

      <p>{status.message}</p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close message"
      >
        ×
      </button>
    </div>
  );
}

export default StatusMessage;