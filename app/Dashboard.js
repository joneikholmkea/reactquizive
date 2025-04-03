// Dashboard.js
import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
// Assuming your JSON file is saved as questions.json in the same directory
// import questionsData from './questions.json';

// Definer quiz-data som et array af objekter
const quizData = [
  {
    topic: "React Component",
    questions: [
      {
        question:
          "Hvad er den korrekte syntaks for at definere en funktionel React komponent?",
        options: [
          "function MinKomponent() { return <View></View>; }",
          "class MinKomponent { render() { return <View></View>; } }",
          "const MinKomponent = function() => { return <View></View>; }",
          "MinKomponent = () => <View></View>",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Hvilken af følgende er IKKE en gyldig React Native core komponent?",
        options: ["Text", "View", "Div", "Image"],
        correctAnswer: 2,
      },
      {
        question: "Hvad er den korrekte livscyklus for en React komponent?",
        options: [
          "Rendering → Opdatering → Mounting → Unmounting",
          "Mounting → Rendering → Opdatering → Unmounting",
          "Mounting → Opdatering → Unmounting",
          "Mounting → Rendering → Unmounting",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    topic: "Custom Component",
    questions: [
      {
        question: "Hvordan importeres en custom komponent fra en anden fil?",
        options: [
          "import { MinKomponent } from './MinKomponent';",
          "require('./MinKomponent');",
          "import MinKomponent from './MinKomponent';",
          "import('./MinKomponent.js');",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Hvad er den bedste praksis for at navngive custom komponenter i React Native?",
        options: [
          "minKomponent",
          "MinKomponent",
          "min_komponent",
          "min-komponent",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Hvordan kan en custom komponent genbruges flere steder i en applikation?",
        options: [
          "Ved at kopiere koden hver gang komponenten skal bruges",
          "Ved at definere komponenten i App.js",
          "Ved at eksportere komponenten og importere den hvor den skal bruges",
          "Ved at bruge global state til at gemme komponenten",
        ],
        correctAnswer: 2,
      },
    ],
  },
];

export default function Dashboard({ navigation }) {
  // The topics are stored under the "questions" key in the JSON
  const topics = quizData;

  // Render each topic as a button
  const renderTopic = ({ item }) => (
    <Pressable
      onPress={() => console.log("Navigating tool to be inserted here")}
    >
      <Text style={styles.topicText}>{item.topic}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Topic</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.topic}
        renderItem={renderTopic}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  topicButton: {
    padding: 12,
    backgroundColor: "#eee",
    marginVertical: 8,
    borderRadius: 4,
  },
  topicText: {
    fontSize: 18,
  },
});
