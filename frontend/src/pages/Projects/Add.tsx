import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/axios";

export default function AddProject() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await api.post("/projects", data);
      toast.success("Project created successfully!");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Add New Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Project Name" {...register("name", { required: true })} />
        <Textarea placeholder="Description" {...register("description")} className="md:col-span-2" />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <Input type="date" {...register("startDate", { required: true })} />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <Input type="date" {...register("endDate", { required: true })} />
        </div>

        <Input placeholder="Required Skills (comma separated)" {...register("requiredSkills")} className="md:col-span-2" />
        <Input type="number" placeholder="Team Size" {...register("teamSize", { required: true, valueAsNumber: true })} />
        <select {...register("status", { required: true })} className="border p-2 rounded w-full">
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <div className="md:col-span-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
