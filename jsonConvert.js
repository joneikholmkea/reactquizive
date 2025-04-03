const filePath = path.join(__dirname, "questions.json");
const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

async function importQuestions() {
  const topics = jsonData.questions;

  for (const topicObj of topics) {
    const topic = topicObj.topic;
    const questions = topicObj.questions;

    for (const q of questions) {
      // Prepare the document data
      const docData = {
        topic: topic,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer
      };

      try {
        // Add document to the 'questions' collection (auto-generates a document ID)
        await db.collection("questions").add(docData);
        console.log(`Imported question: ${q.question}`);
      } catch (error) {
        console.error("Error importing question:", q.question, error);
      }
    }
  }
}

importQuestions()
  .then(() => {
    console.log("Import complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during import:", error);
    process.exit(1);
  });