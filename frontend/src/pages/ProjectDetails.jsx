import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import TaskList from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className='p-6 text-center'>Loading...</div>;
  }

  if (!project) {
    return <div className='p-6 text-center'>Project not found</div>;
  }

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold break-words'>{project.name}</h1>
        <p className='text-gray-600 mt-2 text-sm sm:text-base break-words'>{project.description || "No description"}</p>
        <p className='text-xs sm:text-sm text-gray-400 mt-1'>
          Created: {new Date(project.created_at).toLocaleDateString()}
        </p>
      </div>
      
      <TaskForm projectId={id} />
      <TaskList projectId={id} />
    </div>
  );
}
