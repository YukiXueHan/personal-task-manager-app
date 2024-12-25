import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';
import { useTaskManager, Task } from '@/hooks/useTaskManager';

const TaskList: React.FC = () => {
  const { tasks, addTask } = useTaskManager(); // 使用自定义 Hook
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    try {
      addTask(title, description);
      setTitle('');
      setDescription('');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

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

      {/* 任务输入表单 */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Add Task" onPress={handleAddTask} />
      </View>

      {/* 任务列表 */}
      <FlatList
        data={tasks}
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
  form: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
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
