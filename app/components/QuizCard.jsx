import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
// import SlideToReveal from './SlideToReveal'; // Couldn't get this to work - thursday assignment :-)

// This component receives the question data and a callback function
export default function QuizCard({ questionData, onAnswerSelect }) {
  const { question, options, correctAnswer, id } = questionData; // Destructure props
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option index
  const [showAnswer, setShowAnswer] = useState(false); // State to control answer visibility

   // Reset state when the question changes (using id as dependency)
  useEffect(() => {
    setSelectedOption(null);
    setShowAnswer(false);
  }, [id]);


  const handlePressOption = (index) => {
     if (selectedOption !== null) return; // Prevent changing answer after selection

    setSelectedOption(index);
    // Optionally reveal answer immediately or wait for a confirmation/next step
    setShowAnswer(true); // Show correct/incorrect feedback
    // Call the callback passed from parent (Questions.js) AFTER a short delay
    // This allows the user to see the feedback before moving on
     setTimeout(() => {
       onAnswerSelect(index); // Pass the selected index to the parent
     }, 1500); // Delay of 1.5 seconds
  };

  // --- Alternative using SlideToReveal ---
  // const handleReveal = () => {
  //   setShowAnswer(true);
  //   // Potentially disable further interaction here
  // };

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          // Determine button style based on selection and correctness
          let buttonStyle = [styles.optionButton];
          let textStyle = [styles.optionText];

          if (selectedOption !== null && showAnswer) { // Only apply feedback styles after selection and showing answer
            if (index === correctAnswer) {
              buttonStyle.push(styles.correctOption); // Correct answer style
              textStyle.push(styles.correctText);
            } else if (index === selectedOption) {
              buttonStyle.push(styles.incorrectOption); // Incorrectly selected answer style
              textStyle.push(styles.incorrectText);
            } else {
               buttonStyle.push(styles.disabledOption); // Dim unselected, incorrect options
               textStyle.push(styles.disabledText);
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={buttonStyle}
              onPress={() => handlePressOption(index)}
              disabled={selectedOption !== null} // Disable after selection
            >
              <Text style={textStyle}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* --- Example using SlideToReveal (if needed) --- */}
      {/* {selectedOption !== null && !showAnswer && (
        <SlideToReveal onEndReached={handleReveal} />
      )} */}

       {/* --- Simple Reveal Button (Alternative) --- */}
       {/* {selectedOption !== null && !showAnswer && (
         <Button title="Reveal Answer" onPress={() => setShowAnswer(true)} />
       )} */}

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9', // Light background for the card
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25, // More space below question
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#e7e7e7',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 6, // Space between options
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000', // Default text color
  },
  correctOption: {
    backgroundColor: '#d4edda', // Light green for correct
    borderColor: '#c3e6cb',
  },
   correctText: {
     fontWeight: 'bold',
     color: '#155724' // Dark green text
   },
  incorrectOption: {
    backgroundColor: '#f8d7da', // Light red for incorrect
    borderColor: '#f5c6cb',
  },
   incorrectText: {
     fontWeight: 'bold',
     color: '#721c24' // Dark red text
   },
  disabledOption: {
    backgroundColor: '#f0f0f0', // Grey out disabled options
    borderColor: '#e0e0e0',
  },
   disabledText: {
     color: '#888' // Grey text
   }
});