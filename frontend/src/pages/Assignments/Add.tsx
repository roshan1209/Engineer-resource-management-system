import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAssignmentStore } from "@/store/AssignmentStore";
import type { Assignment } from "@/types/assignment";

export default function AddAssignment() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [engineers, setEngineers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const { addAssignment } = useAssignmentStore();

  useEffect(() => {
    fetchEngineers();
    fetchProjects();
  }, []);

  const fetchEngineers = async () => {
    try {
      const res = await api.get("/engineers");
      setEngineers(res.data || []);
    } catch {
      toast.error("Failed to load engineers");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data || []);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.post("/assignments", data);
      toast.success("Assignment created");
      addAssignment(res.data as Assignment);
      navigate("/assignments");
    } catch {
      toast.error("Failed to create assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Add Assignment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-6">

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium text-gray-700">Engineer</label>
          <select {...register("engineer", { required: true })} className="border p-2 rounded w-full">
            <option value="">Select Engineer</option>
            {engineers.map(e => (
              <option key={e._id} value={e._id}>{e.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium text-gray-700">Project</label>
          <select {...register("project", { required: true })} className="border p-2 rounded w-full">
            <option value="">Select Project</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium text-gray-700">Role</label>
          <Input {...register("role", { required: true })} />
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium text-gray-700">Allocation Percentage</label>
          <Input type="number" {...register("allocationPercentage", { required: true, valueAsNumber: true })} />
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium text-gray-700">Start Date</label>
          <Input type="date" {...register("startDate", { required: true })} />
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <Input type="date" {...register("endDate", { required: true })} />
        </div>

        <div className="w-full">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Create Assignment"}
          </Button>
        </div>

      </form>
    </div>
  );
}
