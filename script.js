//HTML elements //
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");



// Choice button IDs //
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Astrology Quiz Question index
var quizQuestions = [
    {
    question: "What are Leos typically known as?",
    choiceA: "Earth Signs",
    choiceB: "Water Signs",
    choiceC: "Fire Signs",
    choiceD: "Air Signs",
    correctAnswer: "c"},
  {
    question: "When are Gemini's born?",
    choiceA: "Between May and June",
    choiceB: "Between November and December",
    choiceC: "Between Febuary and March",
    choiceD: "Between July and August",
    correctAnswer: "a"},
   {
    question: "What is a trait that Taurus' are known for?",
    choiceA: "Vanity",
    choiceB: "Stubborness",
    choiceC: "Minimalism",
    choiceD: "Vunerability",
    correctAnswer: "b"},
    {
    question: "Who is the biggest crybaby in the zodiac?",
    choiceA: "Aries",
    choiceB: "Virgo",
    choiceC: "Libra",
    choiceD: "Cancer",
    correctAnswer: "d"},
    {
    question: "What are aquarius' typical traits?",
    choiceA: "progressive, independent, intelligent, unique, and idealistic",
    choiceB: "childish, crybaby, materialistic, and impatient",
    choiceC: "kind, critical, stubborn, and overthinkers",
    choiceD: "Distrusting, jealous, secretive, violent",
    correctAnswer: "a"},  
    {
    question: "Who is typically the most hated zodiac sign?",
    choiceA: "Scorpio",
    choiceB: "Pisces",
    choiceC: "Gemini",
    choiceD: "Capricorn",
    correctAnswer: "c"},
    {
    question: "What animal represents Aries?",
    choiceA: "The Crab",
    choiceB: "The Ram",
    choiceC: "Two Fish",
    choiceD: "The Lion",
    correctAnswer: "b"},
    {
    question: "What sign is born between February 19th and March 20th?",
    choiceA: "Virgo",
    choiceB: "Libra",
    choiceC: "Pisces",
    choiceD: "Aquarius",
    correctAnswer: "c"},
    {
    question: "Which sign is known as the archer?",
    choiceA: "Sagittarius",
    choiceB: "Capricorn",
    choiceC: "Leo",
    choiceD: "Aquarius",
    correctAnswer: "a"}, 
    {
    question: "Which sign is known for their loyalty and attention to detail?", 
    choiceA: "Virgo",
    choiceB: "Leo",
    choiceC: "Sagittarius",
    choiceD: "Aries",
    correctAnswer: "a"}, 
    {
    question: "In the calendar year which sign is the 6th?", 
    choiceA: "Libra",
    choiceB: "Gemini",
    choiceC: "Cancer",
    choiceD: "Taurus",
    correctAnswer: "c"}, 

    {
    question: "Which signs are known to be more practical and grounded?", 
    choiceA: "Fire Signs",
    choiceB: "Earth Signs",
    choiceC: "Air Signs",
    choiceD: "Water Signs",
    correctAnswer: "b"},

    {
    question: "Last question which sign is the best LOL", 
    choiceA: "Pisces",
    choiceB: "Aries",
    choiceC: "Cancer",
    choiceD: "Sagittarius",
    correctAnswer: "d"},               
            
   
    
];
// Other variables (global) //
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 45;
var timerInterval;
var score = 0;
var correct;

// This function goes through the array containing the quiz questions to generate the questions and answers. //
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz, Timer, hides start button, and first question. //
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// End of the quiz or if time runs out // 
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "Hmmm looks like ya got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, shows array of high scores already saved in local stoage and pushes the new user name and score into local storage. Then shows high scores. // 
submitScoreBtn.addEventListener("click", function highscore(){
    
    // this is an alert if you do not add initials to the quiz upon completion// 
    if(highscoreInputName.value === "") {
        alert("Enter your name or perish >:)");
        return false;
    }else{
        // variables for user scores //
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears high scores and generates a new high score list from local storage // // ref w3 for function //
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// displays the high scores and hides all of the other //
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores and text from the high score board. //
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This sets all the variables back to their original values and shows the home page. //
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
       
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts quiz. //
startQuizButton.addEventListener("click",startQuiz);
