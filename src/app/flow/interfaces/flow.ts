export interface Flow {
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
}
