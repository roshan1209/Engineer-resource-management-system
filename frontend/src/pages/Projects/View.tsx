import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { formatDate } from "../../lib/utils";

export default function View() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load project details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (!project) return <p className="text-gray-500">No project found.</p>;

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{project.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={
              project.status === "active" ? "default" :
              project.status === "completed" ? "success" : "secondary"
            }>
              {project.status}
            </Badge>
            <span className="text-gray-500 text-sm">
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </span>
          </div>
        </div>
        <Button variant="secondary" onClick={() => navigate("/projects")}>Back to Projects</Button>
      </div>

      <div className="border rounded-lg bg-white shadow-sm p-6 space-y-6">
        <div>
          <h2 className="font-medium text-gray-700 mb-1">Description</h2>
          <p className="text-gray-800">{project.description || "No description provided."}</p>
        </div>

        <div>
          <h2 className="font-medium text-gray-700 mb-1">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {project.requiredSkills?.length > 0 ? (
              project.requiredSkills.map((skill: string, idx: number) => (
                <Badge key={idx} variant="outline">{skill}</Badge>
              ))
            ) : (
              <p className="text-gray-500">No skills specified.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-12">
          <div>
            <h2 className="font-medium text-gray-700 mb-1">Team Size</h2>
            <p className="text-gray-800">{project.teamSize}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-700 mb-1">Timeline</h2>
            <p className="text-gray-800">
              {formatDate(project.startDate)} to {formatDate(project.endDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
