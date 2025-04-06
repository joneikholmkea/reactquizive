// app/Dashboard.js
import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

// 1. Import the JSON file from the root directory
//    '..' goes up one level from 'app' to the root.
import rawQuizData from '../questions.json';

// 2. Process the imported data to add unique IDs to each question
//    This is important for React's list keys and state management.
const processedTopics = rawQuizData.questions.map((topic) => ({
    ...topic, // Keep existing topic properties (like 'topic' name)
    questions: topic.questions.map((question, index) => ({
        ...question, // Keep existing question properties
        // Create a unique ID. Using topic name + index is a simple strategy.
        // Replace spaces in topic name for a cleaner ID.
        id: `${topic.topic.replace(/\s+/g, '_')}-${index}`
    }))
}));


// Dashboard Component receives 'navigation' prop from Stack.Navigator
export default function Dashboard({ navigation }) {

  // 3. Use the processed data (which now includes IDs)
  //    Access the array which is the value of the "questions" key in your JSON.
  const topics = processedTopics; // Use the processed data with IDs

  // Check if data loaded correctly (optional but good practice)
  if (!topics || !Array.isArray(topics)) {
      console.error("Failed to load or process topics from questions.json");
      // Render an error message or fallback UI
      return (
          <View style={styles.container}>
              <Text style={styles.errorText}>Error loading quiz data.</Text>
          </View>
      );
  }

  // Render each topic as a button
  const renderTopic = ({ item }) => (
    <Pressable
      style={styles.topicButton}
      onPress={() => {
        console.log(`Navigating to Questions for topic: ${item.topic}`);
        // Navigate to the 'Questions' screen
        // Pass the array of questions (which now include IDs) and the topic name
        navigation.navigate('Questions', {
          topicQuestions: item.questions, // These questions now have IDs
          topicName: item.topic,
        });
      }}
    >
      <Text style={styles.topicText}>{item.topic}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={topics}
        // Use topic name as key, assuming they are unique
        keyExtractor={(item) => item.topic}
        renderItem={renderTopic}
      />
    </View>
  );
}

// --- Styles (keep the existing styles) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  topicButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  topicText: {
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: { // Style for error message
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  }
});