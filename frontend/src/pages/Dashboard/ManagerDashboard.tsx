import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-toastify";

export default function ManagerDashboard() {
  const [engineers, setEngineers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEngineers();
  }, []);

  const fetchEngineers = async () => {
    try {
      const res = await api.get("/engineers");
      const engineerList = res.data || [];

      const withCapacity = await Promise.all(
        engineerList.map(async (eng) => {
          const capRes = await api.get(`/engineers/${eng._id}/capacity`);

          const maxCap = eng.maxCapacity || 100;
          const allocated = capRes.data.allocatedPercentage;
          const available = capRes.data.availableCapacity;
          const percent = Math.min(100, (allocated / maxCap) * 100);

          const isOverloaded = allocated >= maxCap;
          const isUnderutilized = allocated < maxCap * 0.5;

          return {
            ...eng,
            allocatedPercentage: allocated,
            availableCapacity: available,
            progress: percent,
            isOverloaded,
            isUnderutilized
          };
        })
      );

      setEngineers(withCapacity);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load team overview");
    } finally {
      setLoading(false);
    }
  };

  const overloaded = engineers.filter(e => e.isOverloaded);
  const underutilized = engineers.filter(e => !e.isOverloaded && e.isUnderutilized);
  const healthy = engineers.filter(e => !e.isOverloaded && !e.isUnderutilized);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Team Overview</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading team data...</div>
      ) : (
        <>
          {overloaded.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-600">Overloaded Engineers ({overloaded.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {overloaded.map((eng) => renderEngineerCard(eng))}
              </div>
            </div>
          )}

          {underutilized.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-700">Underutilized Engineers ({underutilized.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {underutilized.map((eng) => renderEngineerCard(eng))}
              </div>
            </div>
          )}

          {healthy.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-700">Healthy Engineers ({healthy.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {healthy.map((eng) => renderEngineerCard(eng))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  function renderEngineerCard(eng) {
    return (
      <Card key={eng._id} className="p-4 shadow-sm border bg-white">
        <CardContent className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium">{eng.name}</h4>
              <p className="text-sm text-gray-500 capitalize">{eng.seniority} Engineer</p>
            </div>

            {eng.isOverloaded && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">Overloaded</span>
            )}

            {!eng.isOverloaded && eng.isUnderutilized && (
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Underutilized</span>
            )}
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Allocated: {eng.allocatedPercentage}%</span>
            <span>Available: {eng.availableCapacity}%</span>
          </div>

          <Progress value={eng.progress} className={eng.progress >= 100 ? "bg-red-500" : ""} />

          <div className="flex gap-2 flex-wrap mt-2">
            {eng.skills?.map((skill) => (
              <span key={skill} className="bg-gray-100 text-xs px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
}
