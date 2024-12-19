export interface Todo {
  id: number;
  text: string;
  status: 'todo' | 'doing' | 'done';
}

export interface Column {
  id: string;
  title: string;
  taskIds: number[];
}