import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// 定义 Task 类型
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

// 模拟任务数据
const mockTasks: Task[] = [
  { id: 1, title: 'Task 1', description: 'This is the first task', status: 'pending' },
  { id: 2, title: 'Task 2', description: 'This is the second task', status: 'completed' },
  { id: 3, title: 'Task 3', description: 'This is the third task', status: 'pending' },
];

const TaskList: React.FC = () => {
  // 渲染每个任务的组件
  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.status}>
        Status: <Text style={item.status === 'completed' ? styles.completed : styles.pending}>{item.status}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task List</Text>
      <FlatList
        data={mockTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  taskContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
});

export default TaskList;
