export interface Project {
  id: number;
  title: string;
  description?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
