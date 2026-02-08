const quizForm = document.getElementById("quiz");
const topicSelect = document.getElementById("topicSelect");
const submitBtn = document.getElementById("submitBtn");
const resultEl = document.getElementById("result");

let allQuestions = [];
let filteredQuestions = [];
let currentIndex = 0; // Track which question is currently displayed
let score = 0;

// Load questions from JSON file
async function loadQuestions() {
  try {
    const response = await fetch("data/questions.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
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

  currentIndex = 0; // Reset index when topic changes
  score = 0;
  resultEl.textContent = "";
  renderQuestion();
}

// Render a single question
function renderQuestion() {
  quizForm.innerHTML = "";

  if (filteredQuestions.length === 0) {
    quizForm.innerHTML = "<p>No questions available for this topic.</p>";
    submitBtn.style.display = "none";
    return;
  }

  const q = filteredQuestions[currentIndex];
  quizForm.innerHTML = `
    <div class="question">
      <h3>${q.id}: ${q.question}</h3>
      ${q.options
        .map(
          (opt, i) => `
        <label class="option">
          <input type="radio" name="answer" value="${i}" />
          ${opt}
        </label>
      `
        )
        .join("")}
      <div class="feedback"></div>
    </div>
  `;

  submitBtn.style.display = "inline-block";
  submitBtn.textContent = currentIndex < filteredQuestions.length - 1 ? "Next" : "Submit";
}

// Handle submit / next button
submitBtn.addEventListener("click", () => {
  const q = filteredQuestions[currentIndex];
  const selected = document.querySelector('input[name="answer"]:checked');
  const feedbackEl = document.querySelector(".feedback");

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

  // Wait a moment to show feedback before moving to next question
  submitBtn.disabled = true;
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < filteredQuestions.length) {
      renderQuestion();
    } else {
      quizForm.innerHTML = "";
      submitBtn.style.display = "none";
      resultEl.textContent = `Quiz finished! Score: ${score} / ${filteredQuestions.length}`;
    }
    submitBtn.disabled = false;
  }, 1000);
});

// Update questions when topic changes
topicSelect.addEventListener("change", filterQuestions);

// Initialize
loadQuestions();
