DevOps Quiz Web Application
Overview

The DevOps Quiz App is a simple static web application designed to help learners understand DevOps concepts through interactive quizzes. This project demonstrates collaborative development using Git, GitHub, and branching workflows, emphasizing incremental development and version control best practices.

The app was developed as part of a pair assignment in a Distributed Version Control Systems (DVCS) lab, focusing on collaboration, pull requests, and merge conflict resolution.

Features

Load DevOps quiz questions from a JSON file.

Select a specific DevOps topic to focus on.

Display one question at a time with multiple choice options.

Provide immediate feedback and explanation after each answer.

No backend required — fully static using HTML, CSS, and JavaScript.

Demonstrates incremental development and collaborative workflows.

DevOps Topics Covered

The question bank includes topics such as:

The DevOps Culture

Version Control Systems

Continuous Integration (CI)

Continuous Delivery (CD)

Continuous Deployment

Infrastructure as Code (IaC)

DevOps Planning and Practices

At least 20 questions are included in the initial version, covering multiple topics.

Question Format

Each quiz question follows this JSON structure:

{
  "id": "Q1",
  "topic": "Continuous Integration",
  "question": "What is the primary goal of Continuous Integration?",
  "options": [
    "Automatically deploy to production",
    "Frequently integrate code changes into a shared repository",
    "Eliminate the need for testing",
    "Remove the need for branches"
  ],
  "answerIndex": 1,
  "explanation": "Continuous Integration aims to detect integration issues early."
}


Notes:

answerIndex is 0-based.

topic categorizes the question for easier selection in the UI.

explanation provides immediate feedback after answering.

How to Use

Open index.html in a web browser.

Select a DevOps topic from the dropdown.

Answer questions one at a time.

View immediate feedback and explanations after each answer.

Development Workflow

Feature branches were used for parallel development:

feature/question-bank → DevOps questions and JSON structure.

feature/quiz-ui → UI, quiz logic, and integration.

Incremental commits and pull requests ensure traceable, collaborative development.

Merge conflicts were intentionally practiced to demonstrate conflict resolution.

Contributions

This project was completed as a pair assignment, with both students collaborating using GitHub. Each contributor’s changes were reviewed and merged via pull requests.

License

This project is publicly available for educational purposes.
