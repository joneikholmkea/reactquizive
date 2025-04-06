import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
// Removed import for questions.json as Dashboard handles this now 
import QuizCard from "./components/QuizCard";

export default function Questions({ route, navigation }) {
  // --- State Hooks ---
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // --- Effects ---
  useEffect(() => {
    if (route.params?.topicQuestions && route.params?.topicName) {
      const { topicQuestions, topicName } = route.params;
      setQuestionList(topicQuestions);
      setCurrentQuestionIndex(0);
      setScore(0); // Reset score when a new topic starts
      setQuizFinished(false); // Reset finished state
      navigation.setOptions({ title: topicName });
    } else {
      console.error("No topic questions passed to Questions screen!");
      Alert.alert("Error", "Could not load questions for this topic.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    }
  }, [route.params, navigation]);

  // --- Event Handlers ---
  const handleAnswerSelected = (selectedIndex) => {
    const currentQuestion = questionList[currentQuestionIndex];
    if (!currentQuestion) return;

    if (selectedIndex === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      console.log("Correct!");
    } else {
      console.log("Incorrect.");
    }
    // Directly call goToNextQuestion after handling the answer
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizFinished(true);
      console.log(`Quiz Finished! Final Score (at state update): ${score}/${questionList.length}`); // Keep console log for debugging if desired
    }
  };

  // --- Render Logic ---
  // Handle loading state or empty list
  if (questionList.length === 0 && !quizFinished) {
    return (
      <View style={styles.container}>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  // Handle quiz finished state (This is now the SOLE way results are shown)
  if (quizFinished) {
    // This view will render after setQuizFinished(true) causes a re-render,
    // ensuring the 'score' state is up-to-date for display.
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.finishedText}>Quiz Finished!</Text>
        <Text style={styles.scoreText}>Final Score: {score} / {questionList.length}</Text>
        <Button title="Back to Topics" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    );
  }

  // Get the current question object based on the index
  const currentQuestion = questionList[currentQuestionIndex];

  // Render the current question using QuizCard
  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
         Question {currentQuestionIndex + 1} of {questionList.length}
      </Text>
      {currentQuestion ? (
         <QuizCard
            key={currentQuestion.id}
            questionData={currentQuestion}
            onAnswerSelect={handleAnswerSelected}
        />
      ) : (
        <Text>Error loading question.</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

// --- Styles (keep existing styles) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    finishedText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 18,
        marginBottom: 20,
    },
});