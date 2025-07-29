import { create } from "zustand";
import type { Project } from "@/types/project";

type ProjectStore = {
  projects: Project[];
  setProjects: (data: Project[]) => void;
  addProject: (p: Project) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (data) => set({ projects: data }),
  addProject: (p) =>
    set((state) => ({
      projects: [p, ...state.projects],
    })),
}));
