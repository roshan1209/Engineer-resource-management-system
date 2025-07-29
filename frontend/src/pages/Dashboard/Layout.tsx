import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "../../store/AuthStore";
import { FaHardHat, FaProjectDiagram, FaOptinMonster, FaTasks, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function DashboardLayout() {
  const setToken = useAuthStore((state) => state.setToken);
  const role = useAuthStore((state) => state.role);
  const username = useAuthStore((state) => state.name);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null,null,null);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <aside className="w-64 bg-slate-900 min-h-screen text-white flex flex-col p-4 space-y-4">
        <h1 className="text-xl font-semibold mb-6">{username || "User"}</h1>
        <nav className="flex flex-col gap-3">
          {role === 'manager' && (
            <> <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate('/')}><FaOptinMonster /> Overview</Button>
              <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate('/engineers')}><FaHardHat /> Engineers</Button>
              <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate('/projects')}><FaProjectDiagram /> Projects</Button>
              <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate('/assignments')}><FaTasks /> Assignments</Button>
            </>
          )}

          {role === 'engineer' && (
            <>
            <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate('/')}><FaOptinMonster /> Overview</Button>
              <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate('engineer/assignments')}><FaTasks /> My Assignments</Button>
              <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate('/profile')}><FaUser /> Profile</Button>
            </>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-300">
          <Button variant="destructive" className="w-full gap-2 bg-fuchsia-700" onClick={logout}><FaSignOutAlt /> Logout</Button>
        </div>
      </aside>

      <main className="flex-1 bg-fuchsia-900 p-6 max-h-screen overflow-y-auto">
        <Card className="p-6 shadow-md bg-slate-200">
          <Outlet />
        </Card>
      </main>
    </div>
  );
}
