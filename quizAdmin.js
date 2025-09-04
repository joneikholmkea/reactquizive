import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} from './quizService';

export default function QuizAdmin() {
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editingID, setEditingID] = useState(null);

  
  useEffect(() => {
    loadQuestions();
  }, []);

  // Hent spørgsmål fra Firestore
  async function loadQuestions() {
    const list = await getAllQuestions();
    setQuestions(list);
  }

  // Opret nyt spørgsmål
  async function handleCreate() {
    if (!title.trim()) {
      Alert.alert('Manglende titel', 'Du skal skrive en titel til spørgsmålet.');
      return;
    }

    // Forenklet – answers kan være en komma-separeret liste
    const answersArray = answers.split(',').map((ans) => ans.trim());

    await createQuestion({
      title,
      answers: answersArray,
    });

    setTitle('');
    setAnswers('');
    loadQuestions();
  }

  // Slet spørgsmål
  async function handleDelete(id) {
    await deleteQuestion(id);
    loadQuestions();
  }

  // Forbered redigering
  function handleEdit(id) {
    const q = questions.find((item) => item.id === id);
    if (q) {
      setTitle(q.title);
      setAnswers(q.answers?.join(', '));
      setEditingID(id);
    }
  }

  // Gem opdatering
  async function handleUpdate() {
    if (!editingID) return;

    const answersArray = answers.split(',').map((ans) => ans.trim());

    await updateQuestion(editingID, {
      title,
      answers: answersArray,
    });

    setTitle('');
    setAnswers('');
    setEditingID(null);
    loadQuestions();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Admin</Text>

      <TextInput
        style={styles.input}
        placeholder="Titel på spørgsmål"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Svarmuligheder (kommasepareret)"
        value={answers}
        onChangeText={setAnswers}
      />

      {editingID ? (
        <Button title="Opdater spørgsmål" onPress={handleUpdate} />
      ) : (
        <Button title="Opret spørgsmål" onPress={handleCreate} />
      )}

      <FlatList
        style={{ marginTop: 20 }}
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionItem}>
            <Text style={styles.questionTitle}>
              {item.title} (Muligheder: {item.answers?.join(', ')})
            </Text>
            <View style={styles.buttonRow}>
              <Button title="Rediger" onPress={() => handleEdit(item.id)} />
              <Button title="Slet" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  questionItem: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  questionTitle: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
