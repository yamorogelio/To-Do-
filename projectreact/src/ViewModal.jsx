export default function ViewModal({ task, onClose }) {
  const allDone =
    task.subtasks.length > 0 &&
    task.subtasks.every(sub => sub.done);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Task Details</h2>

        <h3>Task Title:</h3>
        <p>{task.text}</p>

        <h3>Status:</h3>
        <p
          style={{
            color: allDone ? "green" : "orange",
            fontWeight: "bold"
          }}
        >
          {allDone ? "DONE" : "IN PROGRESS"}
        </p>

        <h3>Subtasks:</h3>
        {task.subtasks.length === 0 && <p>No subtasks added.</p>}

        <ul>
          {task.subtasks.map(sub => (
            <li key={sub.id} style={{ marginBottom: "6px" }}>
              {sub.text} — <strong>{sub.done ? "Done" : "Not Done"}</strong>
            </li>
          ))}
        </ul>

        <button onClick={onClose} style={{ marginTop: "15px" }}>
          Close
        </button>
      </div>
    </div>
  );
}