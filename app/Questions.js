import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import questions from "./questions.json";
import QuizCard from "./components/QuizCard";

export default function Questions() {
  const allQuestions = questions.questions.flatMap((topic) => topic.questions);
  const [questionList, setQuestionList] = useState(allQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);

  return (
    <View style={styles.container}>
      <QuizCard question={currentQuestion.question} options={currentQuestion.options} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

