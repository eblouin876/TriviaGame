class Question {
    constructor(question, answerArray, correctAnswer) {
        this.answers = answerArray
        this.shuffleArray(this.answers)
        this.timer = 30;
        this.question = question;
        this.choiceOne = this.answers[0];
        this.choiceTwo = this.answers[1];
        this.choiceThree = this.answers[2];
        this.choiceFour = this.answers[3];
        this.answer = correctAnswer;
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    renderQuestion = function (parentDiv) {
        // Builds the current question in the div given
        parentDiv.append(`
        <div class="col-12">
        <div class="jumbotron">
        <h2 class="timer">Time Remaining: ${this.timer}</h2>
        <div class="row">
        <div class="col-12">
        <h1>Question: ${this.question}</h1>
        </div>
        </div>
        <div class="row">
        <div class="col-12">
        <button class="btn btn-primary response" onclick='game.checkAnswer("${this.choiceOne}")'>${this.choiceOne}</button>
        <button class="btn btn-primary response" onclick='game.checkAnswer("${this.choiceTwo}")'>${this.choiceTwo}</button>
        <button class="btn btn-primary response" onclick='game.checkAnswer("${this.choiceThree}")'>${this.choiceThree}</button>
        <button class="btn btn-primary response" onclick='game.checkAnswer("${this.choiceFour}")'>${this.choiceFour}</button>
        </div>
        </div>
        </div>
        </div>`)


    }
}


class TriviaGame {
    constructor(raw) {
        this.rawQuestions = raw;
        this.questions;
        this.currentQuestion;
        this.correctAnswers;
        this.incorrectAnswers;
        this.unanswered;
        this.newGame();
        this.countdown;
    }
    buildQuestions = () => {
        let builtQuestions = []
        this.rawQuestions.forEach((question) => {
            let answers = question.incorrect_answers.concat(question.correct_answer)
            let newQu = new Question(question.question, answers, question.correct_answer)
            builtQuestions.push(newQu)
        });
        this.questions = builtQuestions
        console.log(this.questions)
    }

    newGame = () => {
        // Starts a new game state. Questions need to be initialized here
        this.buildQuestions(); // All of the questions need to be initialized here
        this.pickQuestion()
    }

    pickQuestion = () => {
        // Chooses a question randomly from the question bank and removes it from the bank
        if (this.questions.length > 0) {
            this.currentQuestion = this.questions.splice((Math.floor(Math.random() * this.questions.length)), 1)[0]
            this.currentQuestion.renderQuestion($("#main-row"))
            this.countdown = setInterval(() => {
                this.currentQuestion.timer--
                $(".timer").text("Time Remaining: " + this.currentQuestion.timer)
                if (this.currentQuestion.timer === 0) {
                    this.checkAnswer("timeout")
                }
            }, 1000)
        } else {
            alert("ask new game")
        }
    }

    checkAnswer = (choice) => {
        clearInterval(this.countdown)
        $("#main-row").empty()
        if (choice === this.currentQuestion.answer) {
            this.correctAnswers++;
            console.log("correct")
        } else if (choice === "timeout") {
            this.unanswered++;
            console.log("out of time")
        } else {
            this.incorrectAnswers++;
            console.log("wrong")
        }

        this.countdown = setTimeout(() => {
            $("#main-row").empty()
            this.pickQuestion()
        }, 5000)
    }


}
let game;

function start() {
    $.ajax({
        url: "https://opentdb.com/api.php?amount=20&category=20&type=multiple",
        complete: (result) => {
            game = new TriviaGame(result.responseJSON.results)
        }
    })
}