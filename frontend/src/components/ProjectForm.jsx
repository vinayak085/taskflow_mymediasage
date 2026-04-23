// components/ProjectForm.jsx
import { useState } from "react";
import API from "../services/api";

export default function ProjectForm({ refresh }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    setLoading(true);
    try {
      await API.post("/projects", { name, description });
      setName("");
      setDescription("");
      refresh();
    } catch (error) {
      console.error("Error creating project:", error);
      setError(error.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className='bg-white shadow-md rounded-xl p-4 sm:p-6 mb-6'>
      <h2 className='text-lg sm:text-xl font-semibold mb-2'>Create Project</h2>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-sm'>
          {error}
        </div>
      )}

      <input
        className='w-full p-2 sm:p-3 border rounded mb-2 text-sm sm:text-base'
        placeholder='Project Name *'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className='w-full p-2 sm:p-3 border rounded mb-2 text-sm sm:text-base'
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button 
        type="submit"
        disabled={loading}
        className='w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded disabled:opacity-50 text-sm sm:text-base font-semibold hover:bg-blue-700 transition'>
        {loading ? "Creating..." : "Add Project"}
      </button>
    </form>
  );
}
