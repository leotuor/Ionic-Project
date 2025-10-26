interface Task {
  id: number;
  title: string;
  completed: boolean;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
}
