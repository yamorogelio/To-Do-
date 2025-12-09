
import { useState } from "react";
import Button from "./Button";

export default function TodoItem({
  task,
  onDelete,
  onEdit,
  onAddSubtask,
  onToggleSubtask,
  onView
}) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [subInput, setSubInput] = useState("");

  return (
    <div className="todo-card">
      {editing ? (
        <input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      ) : (
        <h3>{task.text}</h3>
      )}

      {editing ? (
        <Button
          label="Save"
          onClick={() => {
            onEdit(task.id, newText);
            setEditing(false);
          }}
        />
      ) : (
        <Button label="Edit" onClick={() => setEditing(true)} />
      )}

      <Button label="Delete" onClick={() => onDelete(task.id)} />

      <Button label="View" onClick={() => onView(task)} />

      {/* Add Subtask */}
      <div style={{ marginTop: "10px" }}>
        <input
          value={subInput}
          placeholder="Add subtask..."
          onChange={e => setSubInput(e.target.value)}
        />
        <Button
          label="Add"
          onClick={() => {
            if (subInput.trim() !== "") {
              onAddSubtask(task.id, subInput);
              setSubInput("");
            }
          }}
        />
      </div>

      {/* Subtask list */}
      <ul style={{ marginTop: "10px" }}>
        {task.subtasks.map(sub => (
          <li key={sub.id} style={{ marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={sub.done}
              onChange={() => onToggleSubtask(task.id, sub.id)}
            />
            <span
              className="subtask-text"
              style={{
                textDecoration: sub.done ? "line-through" : "none"
              }}
            >
              {sub.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
