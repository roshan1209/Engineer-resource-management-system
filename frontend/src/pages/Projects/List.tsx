import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { toast } from "react-toastify";
import { useProjectStore } from "../../store/ProjectStore";

export default function ProjectList() {
  const { projects, setProjects } = useProjectStore();
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects", {
        params: statusFilter ? { status: statusFilter } : {}
      });
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted successfully.");
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project.");
    }
  };

  const truncateDescription = (desc, projectId) => {
    const words = desc?.split(" ");
    if (words.length <= 20) return desc;
    return (
      <>
        {words.slice(0, 20).join(" ")}...{" "}
        <button onClick={() => navigate(`/projects/${projectId}`)} className="text-blue-600 underline">
          Read More
        </button>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={() => navigate("/projects/new")}>+ Add Project</Button>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border bg-gray-50 p-2 rounded rounded-md"
        >
          <option value="">All Status</option>
          <option value="planned">Planned</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <Button variant="outline" onClick={() => setStatusFilter("")}>Clear Filter</Button>
      </div>

      <div className="overflow-x-auto border rounded shadow-sm bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left uppercase text-xs font-medium">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Team Size</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">Loading...</td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">No projects found.</td>
              </tr>
            ) : (
              projects.map((project, idx) => (
                <tr key={project._id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="p-3 font-medium">{project.name}</td>
                  <td className="p-3">{truncateDescription(project.description, project._id)}</td>
                  <td className="p-3 capitalize">
                    <Badge className="p-2" variant={
                      project.status === "active" ? "default" :
                      project.status === "completed" ? "success" : "secondary"
                    }>
                      {project.status}
                    </Badge>
                  </td>
                  <td className="p-3">{project.teamSize}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <Button size="sm" onClick={() => navigate(`/projects/${project._id}`)}>View</Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteProject(project._id)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
