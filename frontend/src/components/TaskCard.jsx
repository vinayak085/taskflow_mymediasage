import { useEffect, useState } from "react";
import API from "../services/api";

export default function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let url = `/projects/${projectId}/tasks`;
      const params = [];

      if (status) {
        params.push(`status=${status}`);
      }

      if (sort) {
        params.push(`sort=${sort}`);
      }

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const res = await API.get(url);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status, sort, projectId]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status");
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task");
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "todo":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className='mt-6'>
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4'>
        <select
          className='border p-2 rounded text-sm sm:text-base flex-1'
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value=''>All Status</option>
          <option value='todo'>Todo</option>
          <option value='in-progress'>In Progress</option>
          <option value='done'>Done</option>
        </select>

        <select
          className='border p-2 rounded text-sm sm:text-base flex-1'
          value={sort}
          onChange={(e) => setSort(e.target.value)}>
          <option value=''>Default Sort</option>
          <option value='due_date'>Sort by Due Date</option>
        </select>
      </div>

      {loading ? (
        <div className='text-center py-8'>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          No tasks found. Create one above!
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className='bg-white p-3 sm:p-4 rounded shadow mb-3'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3'>
              <div className='flex-1 min-w-0'>
                <h4 className='font-bold text-base sm:text-lg break-words'>{task.title}</h4>
                {task.description && (
                  <p className='text-gray-600 mt-1 text-sm sm:text-base break-words'>{task.description}</p>
                )}
                <div className='flex flex-wrap gap-2 mt-2'>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(
                      task.priority
                    )}`}>
                    {task.priority}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold text-white ${getStatusColor(
                      task.status
                    )}`}>
                    {task.status}
                  </span>
                  {task.due_date && (
                    <span className='text-xs text-gray-500'>
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className='flex gap-2 sm:flex-col'>
                <select
                  className='border p-1 rounded text-xs sm:text-sm flex-1 sm:flex-none'
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}>
                  <option value='todo'>Todo</option>
                  <option value='in-progress'>In Progress</option>
                  <option value='done'>Done</option>
                </select>
                <button
                  onClick={() => handleDelete(task._id)}
                  className='text-red-500 hover:text-red-700 font-bold px-2 text-lg'>
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
