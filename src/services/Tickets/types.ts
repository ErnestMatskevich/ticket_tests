export enum Type {
  toDo = "To Do",
  done = "Done",
  inProgress = "In Progress",
}

export interface Ticket {
  id?: number;
  header: string;
  content: string;
  complete?: boolean;
  type: Type;
}
