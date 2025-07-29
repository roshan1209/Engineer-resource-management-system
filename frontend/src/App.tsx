import { useAuthStore } from './store/AuthStore';
import { generateRoutes } from './routes';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.role);
  const router = generateRoutes(role, token);

  return (
    <>
       <ToastContainer position="top-right" autoClose={3000} />
        <RouterProvider router={router} />;
    </>
    
  )
}