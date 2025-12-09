import { useState } from "react";
import TodoList from "./TodoList";
import TextInput from "./TextInput";
import Button from "./Button";
import ViewModal from "./ViewModal";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  function handleAdd() {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      subtasks: []
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function handleEdit(id, newText) {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }

  function handleAddSubtask(taskId, subtaskText) {
    setTasks(
      tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: Date.now(), text: subtaskText, done: false }
              ]
            }
          : task
      )
    );
  }

  function handleToggleSubtask(taskId, subtaskId) {
    setTasks(
      tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map(sub =>
                sub.id === subtaskId
                  ? { ...sub, done: !sub.done }
                  : sub
              )
            }
          : task
      )
    );
  }

  return (
    <div className="app-container">
      <h1>Todo App</h1>

      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Type task title..."
      />
      <Button label="Add Task" onClick={handleAdd} />

      <TodoList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAddSubtask={handleAddSubtask}
        onToggleSubtask={handleToggleSubtask}
        onView={setSelectedTask}
      />

      {selectedTask && (
        <ViewModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}