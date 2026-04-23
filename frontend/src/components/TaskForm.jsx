import { useState } from "react";
import API from "../services/api";

export default function TaskForm({ projectId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [due_date, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    setLoading(true);
    try {
      await API.post(`/projects/${projectId}/tasks`, {
        title,
        description,
        status: "todo",
        priority,
        due_date: due_date || undefined,
      });

      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
      setError(error.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className='bg-white p-4 sm:p-6 rounded shadow mb-6'>
      <h2 className='text-lg sm:text-xl font-semibold mb-4'>Create Task</h2>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-sm'>
          {error}
        </div>
      )}

      <input
        className='w-full border p-2 sm:p-3 mr-0 sm:mr-2 mb-2 text-sm sm:text-base rounded'
        placeholder='Task title *'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className='w-full border p-2 sm:p-3 mr-0 sm:mr-2 mb-2 text-sm sm:text-base rounded'
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className='w-full sm:w-auto border p-2 sm:p-3 mr-0 sm:mr-2 mb-2 text-sm sm:text-base rounded'
        value={priority}
        onChange={(e) => setPriority(e.target.value)}>
        <option value='low'>Low Priority</option>
        <option value='medium'>Medium Priority</option>
        <option value='high'>High Priority</option>
      </select>

      <input
        type='date'
        className='w-full sm:w-auto border p-2 sm:p-3 mr-0 sm:mr-2 mb-2 text-sm sm:text-base rounded'
        value={due_date}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        type='submit'
        disabled={loading}
        className='w-full sm:w-auto bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded disabled:opacity-50 text-sm sm:text-base font-semibold hover:bg-green-700 transition mt-2'>
        {loading ? "Creating..." : "Add Task"}
      </button>
    </form>
  );
}
