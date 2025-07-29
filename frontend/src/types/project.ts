export type Project = {
  _id: string;
  name: string;
  description: string;
  requiredSkills: string[];
  status: "planning" | "active" | "completed";
  teamSize: number;
  startDate: string;
  endDate: string;
};
