export interface Template {
  id?: number;
  name: string;
  description: string;
  tasks: Task[];
  createdOn: Date;
  modifiedOn: Date;
}

export interface Task {
  id?: number;
  name: string;
  description: string;
  filters?: Filter[];
}

export interface Filter {
  id?: number;
  name: string;
  description: string;
}
