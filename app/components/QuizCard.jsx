import questions from "../../questions.json";
import { Card } from "@rneui/themed";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useState } from "react";
import SlideToReveal from "./SlideToReveal";
import { Alert } from "react-native";

export default function QuizCard({ question, options }) {
  const allQuestions = questions.questions.flatMap((topic) => topic.questions);
  const [questionList, setQuestionList] = useState(allQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);

  const handleNextQuestion = () => {
    setCurrentQuestion(questionList[currentQuestionIndex + 1]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const handleSlideToReveal = () => {
    // some reveal answer logic here. for now just log the answer
    Alert.alert('Reveal Answer', currentQuestion.answer);
    console.log(currentQuestion.answer);
  }

  return (
<Card containerStyle={styles.card}>
        <Card.Title style={styles.question}>{currentQuestion.question}</Card.Title>
        <TouchableOpacity style={styles.button}>
          <Text>{currentQuestion.options[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>{currentQuestion.options[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>{currentQuestion.options[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>{currentQuestion.options[3]}</Text>
      </TouchableOpacity>
      
      <SlideToReveal onEndReached={handleSlideToReveal} />

      <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
        <Text>Next</Text>
      </TouchableOpacity>
      </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    marginTop: 80,
    margin: 0,
    padding: 20,
    borderRadius: 0,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
});