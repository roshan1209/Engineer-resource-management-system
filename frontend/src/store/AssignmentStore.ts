import { create } from "zustand";
import type { Assignment } from "@/types/assignment";

type AssignmentStore = {
  assignments: Assignment[];
  setAssignments: (data: Assignment[]) => void;
  addAssignment: (a: Assignment) => void;
  removeAssignment: (id: string) => void;
};

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: [],
  setAssignments: (data) => set({ assignments: data }),
  addAssignment: (a) =>
    set((state) => ({
      assignments: [a, ...state.assignments],
    })),
  removeAssignment: (id) =>
    set((state) => ({
      assignments: state.assignments.filter((a) => a._id !== id),
    })),
}));
