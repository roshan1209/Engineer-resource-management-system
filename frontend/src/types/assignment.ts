export type Assignment = {
  _id: string;
  engineer: {
    _id: string;
    name: string;
  };
  project: {
    _id: string;
    name: string;
  };
  role: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
};
