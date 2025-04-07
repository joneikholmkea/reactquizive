import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SlideToReveal from './SlideToReveal';

// This component receives the question data and a callback function
export default function QuizCard({ questionData, onAnswerSelect }) {
  const { question, options, correctAnswer, id } = questionData;
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset state when the question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowAnswer(false);
  }, [id]);


  // 2. MODIFY handlePressOption: Only set the selected option.
  //    Do NOT show the answer or start the timer here.
  const handlePressOption = (index) => {
     if (selectedOption !== null) return; // Prevent changing answer after selection
     setSelectedOption(index); // Register the user's choice
  };

  // 3. CREATE handleReveal function: This will be called by SlideToReveal.
  //    It will show the answer and THEN trigger moving to the next question.
  const handleReveal = () => {
    setShowAnswer(true); // Now show the correct/incorrect feedback colors

    // Call the callback passed from parent (Questions.js) AFTER a delay
    // This allows the user to see the feedback before moving on.
    setTimeout(() => {
        // Ensure an option was actually selected before proceeding
        if (selectedOption !== null) {
             onAnswerSelect(selectedOption); // Pass the selected index to the parent
        }
    }, 1500); // 1.5 second delay *after revealing* before moving on
  };


  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          let buttonStyle = [styles.optionButton];
          let textStyle = [styles.optionText];

          // Apply feedback styles ONLY if an option is selected AND the answer is revealed
          if (selectedOption !== null && showAnswer) {
            if (index === correctAnswer) {
              buttonStyle.push(styles.correctOption);
              textStyle.push(styles.correctText);
            } else if (index === selectedOption) {
              buttonStyle.push(styles.incorrectOption);
              textStyle.push(styles.incorrectText);
            } else {
               buttonStyle.push(styles.disabledOption);
               textStyle.push(styles.disabledText);
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={buttonStyle}
              onPress={() => handlePressOption(index)}
              // Disable options only AFTER an option has been selected
              // (Before revealing, the user might theoretically want to change, though we prevent it above)
              // OR disable *after revealing* -> disabled={showAnswer}
              disabled={selectedOption !== null}
            >
              <Text style={textStyle}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* --- 4. CONDITIONALLY RENDER SlideToReveal --- */}
      {/* Show the slider only AFTER an option is selected BUT BEFORE the answer is shown */}
      {selectedOption !== null && !showAnswer && (
        <SlideToReveal onEndReached={handleReveal} />
      )}

    </View>
  );
}

// --- Styles 
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center', 
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    marginTop: 10,
    width: '100%', 
  },
  optionButton: {
    backgroundColor: '#e7e7e7',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  correctOption: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
   correctText: {
     fontWeight: 'bold',
     color: '#155724'
   },
  incorrectOption: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
   incorrectText: {
     fontWeight: 'bold',
     color: '#721c24'
   },
  disabledOption: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
  },
   disabledText: {
     color: '#888'
   }
});