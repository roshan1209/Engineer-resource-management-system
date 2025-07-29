import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../../lib/utils";
import { toast } from "react-toastify";

export default function EngineerDashboard() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/assignments");
      setAssignments(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const currentProjects = assignments.filter(a => new Date(a.startDate) <= now && new Date(a.endDate) >= now);
  const upcomingAssignments = assignments.filter(a => new Date(a.startDate) > now);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">My Dashboard</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading your assignments...</div>
      ) : (
        <>
          {/* Current Projects Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Current Projects ({currentProjects.length})</h3>
            {currentProjects.length === 0 ? (
              <p className="text-gray-500">You have no active assignments.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProjects.map(assign => renderAssignmentCard(assign, "current"))}
              </div>
            )}
          </div>

          {/* Upcoming Assignments Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Upcoming Assignments ({upcomingAssignments.length})</h3>
            {upcomingAssignments.length === 0 ? (
              <p className="text-gray-500">No upcoming assignments scheduled.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingAssignments.map(assign => renderAssignmentCard(assign, "upcoming"))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  function renderAssignmentCard(assign, type) {
    const isUpcoming = type === "upcoming";
    return (
      <Card key={assign._id} className="p-4 shadow-sm border bg-white">
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{assign.project?.name}</h4>
            <Badge variant={isUpcoming ? "secondary" : "default"}>
              {isUpcoming ? "Upcoming" : "Active"}
            </Badge>
          </div>

          <div className="text-sm text-gray-600">
            <p><strong>Role:</strong> {assign.role}</p>
            <p><strong>Allocation:</strong> {assign.allocationPercentage}%</p>
            <p>
              <strong>Duration:</strong>{" "}
              {formatDate(assign.startDate)} to {formatDate(assign.endDate)}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
}
