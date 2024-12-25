import { useState } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Task 1', description: 'This is the first task', status: 'pending' },
    { id: 2, title: 'Task 2', description: 'This is the second task', status: 'completed' },
  ]);

  const addTask = (title: string, description: string) => {
    if (title.trim() === '' || description.trim() === '') {
      throw new Error('Both title and description are required.');
    }

    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      status: 'pending',
    };

    setTasks([...tasks, newTask]);
  };

  return { tasks, addTask };
};