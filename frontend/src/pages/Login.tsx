import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/auth/login', data)
      setToken(res.data.token, res.data.user.role, res.data.user.name);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fuchsia-900">
      <Card className="w-[350px] shadow-lg bg-slate-200">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input className="bg-gray-50" placeholder="Email" type="email" {...register("email", { required: true })} />
            <Input className="bg-gray-50" placeholder="Password" type="password" {...register("password", { required: true })} />
            <Button className="w-full" type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
