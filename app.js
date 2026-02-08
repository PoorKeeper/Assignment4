const quizForm = document.getElementById("quiz");
const topicSelect = document.getElementById("topicSelect");
const submitBtn = document.getElementById("submitBtn");
const resultEl = document.getElementById("result");

let allQuestions = [];
let filteredQuestions = [];

// Load questions from JSON file
async function loadQuestions() {
  try {
    const response = await fetch("data/questions.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON
    const data = await response.json();

    // Ensure data is an array
    allQuestions = Array.isArray(data) ? data : [data];

    populateTopics();
    filterQuestions();

  } catch (error) {
    quizForm.innerHTML = `<p style="color:red;">Failed to load questions: ${error.message}</p>`;
    console.error("Error loading questions:", error);
  }
}

// Populate topic dropdown
function populateTopics() {
  const topics = [...new Set(allQuestions.map(q => q.topic))];

  // Clear existing options except "All Topics"
  topicSelect.innerHTML = '<option value="all">All Topics</option>';

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

// Filter questions by topic
function filterQuestions() {
  const selectedTopic = topicSelect.value;
  filteredQuestions =
    selectedTopic === "all"
      ? allQuestions
      : allQuestions.filter(q => q.topic === selectedTopic);

  renderQuiz();
}

// Render quiz questions
function renderQuiz() {
  quizForm.innerHTML = "";
  resultEl.textContent = "";

  if (filteredQuestions.length === 0) {
    quizForm.innerHTML = "<p>No questions available for this topic.</p>";
    return;
  }

  filteredQuestions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `
      <h3>${q.id}: ${q.question}</h3>
      ${q.options
        .map(
          (opt, i) => `
        <label class="option">
          <input type="radio" name="q-${index}" value="${i}" />
          ${opt}
        </label>
      `
        )
        .join("")}
      <div class="feedback"></div>
    `;

    quizForm.appendChild(div);
  });
}

// Handle submit button click
submitBtn.addEventListener("click", () => {
  let score = 0;

  filteredQuestions.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="q-${index}"]:checked`
    );

    const feedbackEl =
      quizForm.children[index].querySelector(".feedback");

    if (!selected) {
      feedbackEl.innerHTML = `<span class="incorrect">No answer selected</span>`;
      return;
    }

    if (Number(selected.value) === q.answerIndex) {
      score++;
      feedbackEl.innerHTML = `
        <span class="correct">Correct!</span>
        <div class="explanation">${q.explanation}</div>
      `;
    } else {
      feedbackEl.innerHTML = `
        <span class="incorrect">Incorrect.</span>
        <div class="explanation">
          Correct answer: ${q.options[q.answerIndex]}<br />
          ${q.explanation}
        </div>
      `;
    }
  });

  resultEl.textContent = `Score: ${score} / ${filteredQuestions.length}`;
});

// Update questions when topic changes
topicSelect.addEventListener("change", filterQuestions);

// Initialize
loadQuestions();
