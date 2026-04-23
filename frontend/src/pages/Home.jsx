import { useEffect, useState } from "react";
import API from "../services/api";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/projects?page=${page}&limit=${limit}`);
      setProjects(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>Projects</h1>
      <ProjectForm refresh={fetchProjects} />

      {loading ? (
        <div className='text-center py-8'>Loading...</div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
            {projects.length === 0 ? (
              <div className='col-span-full text-center py-8 text-gray-500'>
                No projects found. Create one above!
              </div>
            ) : (
              projects.map((p) => (
                <ProjectCard key={p._id} project={p} onDelete={fetchProjects} />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className='flex flex-wrap justify-center items-center gap-2 mt-6'>
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className='px-3 sm:px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base'>
                Previous
              </button>
              <span className='px-3 sm:px-4 py-2 text-sm sm:text-base'>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className='px-3 sm:px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base'>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
