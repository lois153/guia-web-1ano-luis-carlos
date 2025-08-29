// Toggle menu no mobile
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      const expanded = toggle.getAttribute("aria-expanded") === "true" || false;
      toggle.setAttribute("aria-expanded", !expanded);
    });
  }
});
// Quiz Data
const quizData = [
  {
    question: "Qual a função do HTML?",
    options: ["Estilizar a página", "Estruturar o conteúdo", "Adicionar interatividade", "Gerenciar o servidor"],
    answer: 1
  },
  {
    question: "Qual a cor primária definida na identidade visual?",
    options: ["#10B981", "#111827", "#2563EB", "#F3F4F6"],
    answer: 2
  },
  {
    question: "Qual prática está ligada à inclusão de leitores de tela?",
    options: ["Semântica", "Responsividade", "Versionamento", "Performance"],
    answer: 0
  },
  {
    question: "Qual destas NÃO é uma tecnologia de front-end?",
    options: ["React", "CSS", "JavaScript", "MySQL"],
    answer: 3
  },
  {
    question: "Qual é o objetivo dos testes?",
    options: ["Definir layout", "Corrigir bugs e validar funcionalidades", "Armazenar dados", "Publicar o site"],
    answer: 1
  },
  {
    question: "Qual banco de dados é relacional?",
    options: ["MongoDB", "MySQL", "Redis", "Neo4j"],
    answer: 1
  },
  {
    question: "Qual etapa vem ANTES do desenvolvimento?",
    options: ["Deploy", "Testes", "Design (UI/UX)", "Manutenção"],
    answer: 2
  },
  {
    question: "O que é versionamento de código?",
    options: ["Guardar arquivos na nuvem", "Gerenciar histórico de alterações", "Atualizar servidor", "Aumentar performance"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;

// Render Quiz
function loadQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (currentQuestion < quizData.length) {
    const q = quizData[currentQuestion];
    const questionEl = document.createElement("div");
    questionEl.classList.add("quiz-question");

    questionEl.innerHTML = `
      <h2>${q.question}</h2>
      <ul>
        ${q.options.map((opt, i) =>
          `<li><button onclick="checkAnswer(${i})">${opt}</button></li>`
        ).join("")}
      </ul>
    `;
    container.appendChild(questionEl);
  } else {
    showResult();
  }
}

function checkAnswer(selected) {
  if (selected === quizData[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  loadQuiz();
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  const result = document.getElementById("quiz-result");
  result.classList.remove("hidden");

  document.getElementById("score").textContent =
    `Você acertou ${score} de ${quizData.length} questões.`;

  // Salvar score no localStorage
  localStorage.setItem("quizScore", score);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-container").classList.remove("hidden");
  document.getElementById("quiz-result").classList.add("hidden");
  loadQuiz();
}

// Start quiz
if (document.getElementById("quiz-container")) {
  loadQuiz();
}
