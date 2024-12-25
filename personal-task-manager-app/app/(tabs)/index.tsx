import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TaskList from '@/components/TaskList'; // 确保 TaskList 路径正确

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TaskList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
