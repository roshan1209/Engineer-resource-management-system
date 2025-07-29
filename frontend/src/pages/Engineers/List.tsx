import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { toast } from "react-toastify";

export default function EngineerList() {
  const [engineers, setEngineers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchSkill, setSearchSkill] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEngineers();
  }, [searchSkill]);

  const fetchEngineers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/engineers", {
        params: searchSkill ? { skill: searchSkill } : {}
      });
      setEngineers(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load engineers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Engineers</h2>
        <Button className="bg-slate-900" onClick={() => navigate("/engineers/new")}>Add New Engineer</Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search by Skill (e.g., React)"
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
          className="w-64 bg-white"
        />
        <Button variant="solid" className="bg-slate-900 text-gray-50" onClick={() => setSearchSkill("")}>Clear</Button>
      </div>

      <div className="overflow-x-auto border rounded shadow-sm bg-white">
        <table className="min-w-full text-sm text-gray-700 rounded">
          <thead className="bg-gray-100 text-left uppercase text-xs font-medium">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Seniority</th>
              <th className="p-3">Max Capacity</th>
              <th className="p-3">Skills</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">Loading...</td>
              </tr>
            ) : engineers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">No engineers found.</td>
              </tr>
            ) : (
              engineers.map((eng, idx) => (
                <tr key={eng._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="p-3 font-medium">{eng.name}</td>
                  <td className="p-3">{eng.email}</td>
                  <td className="p-3">{eng.department || "N/A"}</td>
                  <td className="p-3 capitalize">
                    <Badge className="px-3" variant={
                      eng.seniority === "senior" ? "success" :
                      eng.seniority === "mid" ? "default" : "secondary"
                    }>
                      {eng.seniority}
                    </Badge>
                  </td>
                  <td className="p-3">{eng.maxCapacity}%</td>
                  <td className="p-3 flex flex-wrap gap-1">
                    {eng.skills?.map((skill) => (
                      <span key={skill} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
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
