class Question {
    constructor(question, choiceOne, choiceTwo, choiceThree, choiceFour, answer) {
        this.timer = 30;
        this.question = question;
        this.choiceOne = choiceOne;
        this.choiceTwo = choiceTwo;
        this.choiceThree = choiceThree;
        this.choiceFour = choiceFour;
        this.answer = answer;

        this.renderQuestion = function (parentDiv) {
            // Builds the current question in the div given
            parentDiv.append(`
            <div class="col-12">
            <div class="jumbotron">
            <h2 class="timer">Time Remaining: ${this.timer}</h2>
            <h1>${this.question}</h1>
            <button class="btn btn-primary">${this.choiceOne}</button>
            <button class="btn btn-primary">${this.choiceTwo}</button>
            <button class="btn btn-primary">${this.choiceThree}</button>
            <button class="btn btn-primary">${this.choiceFour}</button>
            </div>
            </div>`)

        }

        this.checkAnswer = function (answer) {
            // Checks the inputt answer against the correct answer and reurns a boolean

        }

    }

}

class TriviaGame {
    constructor() {
        this.questions = [];
        this.currentQuestion;
        this.correctAnswers;
        this.incorrectAnswers;
        this.newGame();
    }

    newGame = function () {
        // Starts a new game state. Questions need to be initialized here

    }

    pickQuestion = function () {
        // Chooses a question randomly from the question bank and removes it from the bank

    }

    updateDisplay = function () {
        // Updates all the existing displays

    }

    chooseAnswer = function () {
        // Reacts to the user clicking any of the buttons

    }
}


// User goes to the website. They see an entrance screen with a push button to start

// They see a question pop up and the timer begins counting down

// They choose an answer that is correct. 

// A screen pops up congratulating them.

// After five seconds, the screen is replaced with a new question

// They choose an answer that is incorrect.

// A screen pops up saying what the correct answer was

// After five seconds, the screen is replaced with a new question

// They don't provide a response. 

// After thirty seconds, a screen pops up saying they ran out of time displaying the correct answer

// After five seconds, the game ends and a screen displays showing the number of correct answers, incorrect answers, and a newgame screen.

let question = new Question("test", "a", "b", "c", "d", "c")
question.renderQuestion($("#main-row"))