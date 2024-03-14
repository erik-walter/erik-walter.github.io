const questions = [
  {
    question: "Was ist die Hauptstadt von Finnland?",
    options:  ["Helsinki", "Turku", "Oulu", "Tampere"],
    answer: "Helsinki"
  }
  ,
  {
    question: "Wer hat die Relativitätstheorie entwickelt?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    answer: "Albert Einstein"
  }
  ,
  {
    question: "Welches Element hat das chemische Symbol 'Hg'?",
    options: ["Quecksilber", "Blei", "Gold", "Silber"],
    answer: "Quecksilber"
  }
  ,
  {
    question: "Wer malte das Gemälde 'Die Mona Lisa'?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
    answer: "Leonardo da Vinci"
  }
]

const questionElement = document.querySelector('.question');
const nextButton = document.getElementById('next');

const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  answer1.disabled = false;
  answer2.disabled = false;
  answer3.disabled = false;
  answer4.disabled = false;
  answer1.style.backgroundColor = 'white';
  answer2.style.backgroundColor = 'white';
  answer3.style.backgroundColor = 'white';
  answer4.style.backgroundColor = 'white';
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  nextButton.style.display = 'block';
  nextButton.innerHTML = "Next";
}

function showQuestion(){
  let questionNumber = currentQuestionIndex + 1;
  questionElement.textContent = questionNumber+". " +questions[currentQuestionIndex].question;
  answer1.innerHTML = questions[currentQuestionIndex].options[0];
  answer2.innerHTML = questions[currentQuestionIndex].options[1];
  answer3.innerHTML = questions[currentQuestionIndex].options[2];
  answer4.innerHTML = questions[currentQuestionIndex].options[3];
  answer1.style.display = 'block';
  answer2.style.display = 'block';
  answer3.style.display = 'block';
  answer4.style.display = 'block';
}

nextButton.addEventListener('click', (e)=>{
  if(nextButton.innerHTML === 'Restart Quiz'){
    startQuiz();
  }
  else{
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      answer1.disabled = false;
      answer2.disabled = false;
      answer3.disabled = false;
      answer4.disabled = false;
      answer1.style.backgroundColor = 'white';
      answer2.style.backgroundColor = 'white';
      answer3.style.backgroundColor = 'white';
      answer4.style.backgroundColor = 'white';
      showQuestion();
    } else {
      showScore();
    }
  }
});

function showScore(){
  questionElement.textContent = "You scored " + score + " out of " + questions.length + " questions right!";
  answer1.style.display = 'none';
  answer2.style.display = 'none';
  answer3.style.display = 'none';
  answer4.style.display = 'none';
  nextButton.innerHTML = "Restart Quiz"
}

function checkAnswer(selectedAnswer){
  if(selectedAnswer.innerHTML === questions[currentQuestionIndex].answer){
    score++;
    selectedAnswer.style.backgroundColor = 'green';
  }
  else{
    selectedAnswer.style.backgroundColor = 'red';

    if(questions[currentQuestionIndex].options.indexOf(questions[currentQuestionIndex].answer) === 0){
      answer1.style.backgroundColor = 'green';
    } else if(questions[currentQuestionIndex].options.indexOf(questions[currentQuestionIndex].answer) === 1){
      answer2.style.backgroundColor = 'green';
    } else if(questions[currentQuestionIndex].options.indexOf(questions[currentQuestionIndex].answer) === 2){
      answer3.style.backgroundColor = 'green';
    } else if(questions[currentQuestionIndex].options.indexOf(questions[currentQuestionIndex].answer) === 3){
      answer4.style.backgroundColor = 'green';
    }
  }
  answer1.disabled = true;
  answer2.disabled = true;
  answer3.disabled = true;
  answer4.disabled = true;
}

answer1.addEventListener('click', (e)=>{
  checkAnswer(answer1);
});
answer2.addEventListener('click', (e)=>{
  checkAnswer(answer2);

});
answer3.addEventListener('click', (e)=>{
  checkAnswer(answer3);

});
answer4.addEventListener('click', (e)=>{
  checkAnswer(answer4);

});

startQuiz();