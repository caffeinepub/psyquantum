export type ProjectStatus = "active" | "inProgress" | "completed";

export interface Project {
  id: bigint;
  title: string;
  description: string;
  status: ProjectStatus;
  tags: Array<string>;
  link: string;
  displayOrder: bigint;
  createdAt: bigint;
}
