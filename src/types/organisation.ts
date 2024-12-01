export interface Organisation {
  id: string;
  name: string;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export type SortField = 'id' | 'name' | 'userCount' | 'createdAt' | 'updatedAt';
export type SortDirection = 'asc' | 'desc';