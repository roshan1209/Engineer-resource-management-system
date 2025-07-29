import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "../services/axios";
import { Loader2, UserCircle, Mail, Briefcase } from "lucide-react";
import { toast } from "react-toastify";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("auth/profile");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Failed to load profile information.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      <Card className="p-6 shadow-sm bg-white border rounded space-y-6">
        
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <UserCircle size={50} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-500 capitalize">{profile.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gray-500" />
            <span>{profile.department || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Max Capacity:</span>
            <span>{profile.maxCapacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Seniority:</span>
            <Badge variant={
              profile.seniority === "senior" ? "success" :
              profile.seniority === "mid" ? "default" : "secondary"
            }>
              {profile.seniority || "N/A"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 col-span-full">
            <span>Skills:</span>
            <span>{profile.skills?.join(", ") || "N/A"}</span>
          </div>
        </div>

      </Card>
    </div>
  );
}
