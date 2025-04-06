// app/Questions.js
import React, { useState, useEffect } from "react"; // Import React and hooks
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native"; // Added Button, Alert
// Removed import for questions.json
import QuizCard from "./components/QuizCard"; // Correct path

// Questions component receives 'route' and 'navigation' props
export default function Questions({ route, navigation }) {
  // --- State Hooks ---
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); // Optional: Add scoring
  const [quizFinished, setQuizFinished] = useState(false);

  // --- Effects ---
  // Get parameters passed from Dashboard and update navigation options
  useEffect(() => {
    // Check if parameters exist
    if (route.params?.topicQuestions && route.params?.topicName) {
      const { topicQuestions, topicName } = route.params;

      // Set the questions for this topic
      setQuestionList(topicQuestions);

      // Reset state for new topic
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizFinished(false);

      // Set the header title dynamically based on the topic
      navigation.setOptions({ title: topicName });

    } else {
      // Handle case where parameters are missing (optional)
      console.error("No topic questions passed to Questions screen!");
      Alert.alert("Error", "Could not load questions for this topic.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
      // Maybe navigate back or show an error message
    }
  }, [route.params, navigation]); // Rerun effect if route params or navigation change


  // --- Event Handlers ---
  const handleAnswerSelected = (selectedIndex) => {
    const currentQuestion = questionList[currentQuestionIndex];
    if (!currentQuestion) return; // Safety check

    // Check if the selected answer is correct
    if (selectedIndex === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1); // Update score
      console.log("Correct!");
      // Optionally provide visual feedback here or in QuizCard
    } else {
      console.log("Incorrect.");
      // Optionally provide visual feedback
    }

    // Move to the next question or finish the quiz
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
     if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // End of the quiz
      setQuizFinished(true);
      console.log(`Quiz Finished! Final Score: ${score}/${questionList.length}`);
      // Show results screen or alert
       Alert.alert(
        "Quiz Complete!",
        `Your score: ${score}/${questionList.length}`,
        [{ text: "OK", onPress: () => navigation.navigate('Dashboard') }] // Navigate back to Dashboard
      );
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

  // Handle quiz finished state (simple version)
  if (quizFinished) {
     // Alert is shown in goToNextQuestion, keep screen simple or show summary
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
      {currentQuestion ? ( // Ensure currentQuestion exists before rendering QuizCard
         <QuizCard
            key={currentQuestion.id} // Use unique question ID as key for re-renders
            questionData={currentQuestion}
            onAnswerSelect={handleAnswerSelected} // Pass the handler down
        />
      ) : (
        <Text>Error loading question.</Text> // Fallback if something goes wrong
      )}

      {/* Removed explicit next button, handleAnswerSelected triggers next question */}
      {/* <Button title="Next Question" onPress={goToNextQuestion} /> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16, // Add padding
  },
   centered: { // Style for centering content
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