import { Link } from "react-router-dom";
import API from "../services/api";

export default function ProjectCard({ project, onDelete }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.delete(`/projects/${project._id}`);
        onDelete();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className='bg-white p-4 sm:p-5 rounded-xl shadow hover:shadow-lg transition relative'>
      <Link to={`/project/${project._id}`}>
        <h3 className='text-base sm:text-lg font-bold break-words'>{project.name}</h3>
        <p className='text-gray-600 mt-2 text-sm sm:text-base break-words'>{project.description || "No description"}</p>
        <p className='text-xs text-gray-400 mt-2'>
          Created: {new Date(project.created_at).toLocaleDateString()}
        </p>
      </Link>
      <button
        onClick={handleDelete}
        className='absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold px-2 py-1 text-lg'>
        ✕
      </button>
    </div>
  );
}
