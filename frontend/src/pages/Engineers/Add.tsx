import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/AuthStore";

export default function Add() {
  const { role } = useAuthStore();
  const isManager = role === "manager";
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  if (!isManager) return <div className="text-center text-gray-500 mt-10">Access Denied</div>;

  const onSubmit = async (data) => {
    try {
      await api.post("auth/register", { ...data, role: "engineer" });
      toast.success("Engineer added successfully");
      navigate("/engineers");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add engineer");
    }
  };

  return (
    <div className="space-y-6">
        
      <h2 className="text-2xl font-semibold">Add Engineer</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-6">
        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input {...register("name", { required: true })} />
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" {...register("email", { required: true })} />
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input type="password" {...register("password", { required: true })} />
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium">Department</label>
          <Input {...register("department")} />
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium">Seniority</label>
          <select {...register("seniority")} className="border p-2 rounded w-full">
            <option value="">Select</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-[48%] space-y-2">
          <label className="text-sm font-medium">Max Capacity (%)</label>
          <Input type="number" {...register("maxCapacity", { required: true })} />
        </div>

        <div className="flex flex-col w-full space-y-2">
          <label className="text-sm font-medium">Skills (comma separated)</label>
          <Input {...register("skills")} placeholder="e.g., React, Node.js" />
        </div>

        <div className="w-full">
          <Button type="submit" className="w-full">Add Engineer</Button>
        </div>
      </form>
    </div>
  );
}
