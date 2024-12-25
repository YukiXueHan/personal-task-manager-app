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

const TaskList: React.FC = () => {
  const { tasks, addTask, setTasks } = useTaskManager();
  const { editTask } = useTaskEditor(tasks, setTasks);

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

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEditModal(item)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task List</Text>

      {/* Add Task Form */}
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

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Edit Task Modal */}
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
  editButton: {
    marginTop: 8,
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default TaskList;