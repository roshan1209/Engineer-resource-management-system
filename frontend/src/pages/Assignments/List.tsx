import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { toast } from "react-toastify";
import { useAssignmentStore } from "../../store/AssignmentStore";
import { useAuthStore } from "../../store/AuthStore";
import type { Assignment } from "@/types/assignment";
import { formatDate } from "../../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AssignmentList() {
  const { assignments, setAssignments } = useAssignmentStore();
  const { role } = useAuthStore(); // Getting role directly from store
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState<Assignment | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const navigate = useNavigate();
  const isManager = role === "manager";

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await api.get<Assignment[]>("/assignments");
      setAssignments(res.data || []);
    } catch {
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const deleteAssignment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await api.delete(`/assignments/${id}`);
      toast.success("Assignment deleted");
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch {
      toast.error("Failed to delete assignment");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;

    setEditLoading(true);
    try {
      const { _id, role, allocationPercentage, startDate, endDate } = editData;
      await api.put(`/assignments/${_id}`, { role, allocationPercentage, startDate, endDate });
      toast.success("Assignment updated");
      fetchAssignments();
      setEditData(null);
    } catch {
      toast.error("Failed to update assignment");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assignments</h2>
        {isManager && (
          <Button onClick={() => navigate("/assignments/new")}>+ Add Assignment</Button>
        )}
      </div>

      <div className="overflow-x-auto border rounded shadow-sm bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left uppercase text-xs font-medium">
            <tr>
              <th className="p-3">Engineer</th>
              <th className="p-3">Project</th>
              <th className="p-3">Role</th>
              <th className="p-3">Allocation</th>
              <th className="p-3">Duration</th>
              {isManager && <th className="p-3 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isManager ? 6 : 5} className="p-4 text-center">Loading...</td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td colSpan={isManager ? 6 : 5} className="p-4 text-center text-gray-500">No assignments found.</td>
              </tr>
            ) : (
              assignments.map((assign) => (
                <tr key={assign._id} className="hover:bg-gray-50">
                  <td className="p-3">{assign.engineer?.name}</td>
                  <td className="p-3">{assign.project?.name}</td>
                  <td className="p-3">{assign.role}</td>
                  <td className="p-3">{assign.allocationPercentage}%</td>
                  <td className="p-3">
                    {formatDate(assign.startDate)} to {formatDate(assign.endDate)}
                  </td>
                  {isManager && (
                    <td className="p-3 flex gap-2 justify-center">
                      <Button size="sm" variant="outline" onClick={() => setEditData(assign)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteAssignment(assign._id)}>Delete</Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editData} onOpenChange={() => setEditData(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
          </DialogHeader>
          {editData && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Role</label>
                <Input
                  value={editData.role}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Allocation Percentage</label>
                <Input
                  type="number"
                  value={editData.allocationPercentage}
                  onChange={(e) =>
                    setEditData({ ...editData, allocationPercentage: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={editData.startDate?.slice(0, 10)}
                  onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={editData.endDate?.slice(0, 10)}
                  onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={editLoading}>
                {editLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
