import { useState } from 'react';

// 定义任务类型
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
      id: tasks.length + 1, // 简单的 ID 生成方式
      title,
      description,
      status: 'pending',
    };

    setTasks([...tasks, newTask]); // 更新任务列表
  };

  return { tasks, addTask };
};
