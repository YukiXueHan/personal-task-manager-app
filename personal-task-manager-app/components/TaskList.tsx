import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useTaskManager, Task } from '@/hooks/useTaskManager';
import { useTaskEditor } from '@/hooks/useTaskEditor';
import { useTaskDeleter } from '@/hooks/useTaskDeleter';
import { useTaskToggler } from '@/hooks/useTaskToggler';
import styles from './TaskList.styles';

const TaskList: React.FC = () => {
  const { tasks, addTask, setTasks } = useTaskManager();
  const { editTask } = useTaskEditor(tasks, setTasks);
  const { deleteTask } = useTaskDeleter(tasks, setTasks);
  const { toggleTaskStatus } = useTaskToggler(tasks, setTasks);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAddTask = () => {
    try {
      addTask(title, description);
      setTitle('');
      setDescription('');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const openEditModal = (task: Task) => {
    setCurrentTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setModalVisible(true);
  };

  const handleEditTask = () => {
    if (currentTaskId === null) return;

    try {
      editTask(currentTaskId, editTitle, editDescription);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleDeleteTask = (id: number) => {
    deleteTask(id);
  };

  const handleToggleTaskStatus = (id: number) => {
    toggleTaskStatus(id);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.status}>
        Status: <Text style={item.status === 'completed' ? styles.completed : styles.pending}>{item.status}</Text>
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => handleToggleTaskStatus(item.id)}
        >
          <Text style={styles.toggleButtonText}>
            {item.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTask(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task List</Text>

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

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Edit Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={editDescription}
              onChangeText={setEditDescription}
            />
            <Button title="Save Changes" onPress={handleEditTask} />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskList;