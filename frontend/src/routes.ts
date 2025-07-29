import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './pages/Dashboard/Layout';
import EngineerList from './pages/Engineers/List';
import ProjectList from './pages/Projects/List';
import AssignmentList from './pages/Assignments/List';
import AddProject from './pages/Projects/Add';
import AddAssignment from './pages/Assignments/Add';
import AddEngineer from './pages/Engineers/Add';
import Profile from './pages/Profile';
import React from 'react';
import ViewProject from './pages/Projects/View';
import ManagerDashboard from './pages/Dashboard/ManagerDashboard';
import EngineerDashboard from './pages/Dashboard/EngineerDashboard';

export const generateRoutes = (role: string | null, token: string | null) => {
  const routes = [
    {
      path: "/login",
      element: Login,
    },
  ];

  if (token) {
    const children = [];

    if (role === "manager") {
      children.push(
        { index: true, element: ManagerDashboard },
        { path: "engineers", element: EngineerList },
        { path: "engineers/new", element: AddEngineer },
        { path: "projects", element: ProjectList },
        { path: "projects/new", element: AddProject },
        { path: "projects/:id", element: ViewProject },
        { path: "assignments", element: AssignmentList },
        { path: "assignments/new", element: AddAssignment }
      );
    }

    if (role === "engineer") {
      children.push(
        { index: true, element: EngineerDashboard },
        { path: "engineer/assignments", element: AssignmentList },
        { path: "profile", element: Profile }
      );
    }

    routes.push({
      path: "/",
      element: DashboardLayout,
      children,
    });
  }

  routes.push({
    path: "*",
    element: token ? DashboardLayout : Login,
  });

  return createBrowserRouter(
    routes.map((route) => ({
      ...route,
      element: React.createElement(route.element),
      children: route.children?.map((child) => ({
        ...child,
        element: React.createElement(child.element),
      })),
    }))
  );
};
