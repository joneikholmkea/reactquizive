import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Opretter et quiz-spørgsmål i Firestore
export async function createQuestion(questionData) {
 
  try {
    await addDoc(collection(db, 'quizQuestions'), questionData);
  } catch (err) {
    console.error('Fejl ved oprettelse af spørgsmål:', err);
  }
}

// Henter alle quiz-spørgsmål
export async function getAllQuestions() {
  try {
    const snapshot = await getDocs(collection(db, 'quizQuestions'));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return list;
  } catch (err) {
    console.error('Fejl ved hentning af spørgsmål:', err);
    return [];
  }
}

// Opdaterer et quiz-spørgsmål
export async function updateQuestion(id, updatedData) {
  try {
    await updateDoc(doc(db, 'quizQuestions', id), updatedData);
  } catch (err) {
    console.error('Fejl ved opdatering af spørgsmål:', err);
  }
}

// Sletter et quiz-spørgsmål
export async function deleteQuestion(id) {
  try {
    await deleteDoc(doc(db, 'quizQuestions', id));
  } catch (err) {
    console.error('Fejl ved sletning af spørgsmål:', err);
  }
}
