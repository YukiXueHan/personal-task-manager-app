import { Task } from './useTaskManager';

export const useTaskEditor = (tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  const editTask = (id: number, updatedTitle: string, updatedDescription: string) => {
    if (!updatedTitle.trim() || !updatedDescription.trim()) {
      throw new Error('Title and description cannot be empty.');
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task
      )
    );
  };

  return { editTask };
};