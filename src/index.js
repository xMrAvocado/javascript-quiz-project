document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("Cuantos peluches tiene Alejandro en su coche?", ["1", "10", "20", "Tantos como amigas lleve en el coche."], "Tantos como amigas lleve en el coche.", 1),
    new Question("Cuándo es el cumpleaños de Jorge?", ["5 de Octubre", "31 de Febrero", "25 de Diciembre", "Ayer"], "5 de Octubre", 1),
    new Question("Dónde vive la novia de Juan?", ["Es imaginación suya.", "Es el poro.", "Mexico", "En mi casa."], "Mexico", 2),
    new Question("Cuántas horas duerme Kurt al día?", ["3", "4", "5", "8"], "5", 3),
    new Question("Actividad favorita de Alejandro?", ["No tiene.", "Gimnasio", "No puede, es negro.", "Recoger algodón."], "Recoger algodón.", 3),
    new Question("Del 1 al 4, cuan parecido es Samuel al Xokas?", ["1", "2", "3", "4"], "4", 3),
    new Question("Cuál es la comida favorita de Jorge?", ["No.", "patata", "Mal.", "Peor."], "patata", 3),
    new Question("Cuántas cosas ha visto el poro de Juan?", ["Muchas.", "Pocas.", "Está traumado el pobre.", "Quien es Juan?"], "Quien es Juan?", 3),
    new Question("Por qué pone Kurt el desenfoque en la cámara?", ["No es desenfoque, son las neuronas trabajando.", "Los porritos.", "Porque está desnudo.", "Porque sale más guapo."], "No es desenfoque, son las neuronas trabajando.", 3),
    new Question("Quién es la novia de Samuel?", ["La perra.", "Qué es una novia?", "La dejó por Ibai.", "Sólo tiene ojos para papi Henry Cavill."], "Sólo tiene ojos para papi Henry Cavill.", 3),
    // Add more questions here
  ];
  const quizDuration = 300; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/
function actualizarTimer(){
  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;
}


  // Show first question
  showQuestion();


  /************  TIMER  ************/

  let timer;
  actualizarTimer();
  iniciarTemporizador();

  function iniciarTemporizador(){
    timer = setInterval(()=>{
      quiz.timeRemaining -= 1;
      actualizarTimer();
      if(quiz.timeRemaining === 0){
        showResults();
      }
      console.log(quiz.timeRemaining);
    }, 1000);
  }
  

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);



  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results



  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();
    
    

    // YOUR CODE HERE:/*Hacer log de question y de quiz*/ 
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    console.log(question);
    console.log(quiz);

    questionContainer.innerText = question.text;
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    
   
    progressBar.style.width = `${(quiz.currentQuestionIndex / quiz.questions.length)*100}%`; // This value is hardcoded as a placeholder


    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

    
    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
      // For each choice create a new radio input with a label, and append it to the choice container.
      // Each choice should be displayed as a radio input element with a label:
      /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
      // Hint 1: You can use the `document.createElement()` method to create a new element.
      // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
      // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
      // Hint 4: You can use the `element.innerText` property to set the inner text of an element.

      let respArr = question.choices;
      respArr.forEach((eachResp)=>{
        choiceContainer.innerHTML += `
        <input type="radio" name="choice" value="${eachResp}">
        <label>${eachResp}</label>
      <br>`
      });
  }


  
  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value



    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    let allChoices = document.querySelectorAll("#choices input");

    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.

      /*selectedAnswer = allChoices.filter((eachChoice)=>{
        if(eachChoice === true){
          return true
        }else{
          return false;
        }
      });
      quiz.checkAnswer(selectedAnswer[0].value);
      quiz.moveToNextQuestion();
      showQuestion();*/
      allChoices.forEach((eachChoice)=>{
        if(eachChoice.checked === true){
          selectedAnswer = eachChoice.value;
        }
      });
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
      
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
      // Move to the next question by calling the quiz method `moveToNextQuestion()`.
      // Show the next question by calling the function `showQuestion()`.
  }  




  function showResults() {

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";
    
    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`; // This value is hardcoded as a placeholder
  
    /*DAY 4*/ 
    clearInterval(timer);

  }
  
  /*5*/ 
  const restartButton = document.querySelector("#restartButton");

  restartButton.addEventListener("click",()=>{
    quizView.style.display = "flex";
    endView.style.display = "none";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();

    /*DAY 4*/ 
    quiz.timeRemaining = quizDuration;
    actualizarTimer();
    iniciarTemporizador();
  });
});