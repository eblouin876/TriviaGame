class Question {
    constructor(question, answerArray, correctAnswer) {
        this.answers = answerArray
        this.shuffleArray(this.answers)
        this.timer = 10;
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
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.unanswered = 0;
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
    }

    newGame = () => {
        // Starts a new game state. Questions need to be initialized here
        this.buildQuestions(); // All of the questions need to be initialized here
        $("#main-row").empty()
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
            let col = $("<div class='col-12'>")
            let jumbo = $("<div class='jumbotron'>")
            let corr = $(`<p>`).text("Correct: " + this.correctAnswers)
            let incorr = $(`<p>`).text("Incorrect: " + this.incorrectAnswers)
            let passed = $(`<p>`).text("Ran out of Time: " + this.unanswered)
            $("#main-row").empty()
            $("#main-row").append(col.append(jumbo.append(corr, incorr, passed)))
            $("#title").text("Select a category for a new game.")
            $('.start-button').removeClass('d-none')

        }
    }

    checkAnswer = (choice) => {
        clearInterval(this.countdown)
        $("#main-row").empty()
        if (choice === this.currentQuestion.answer) {
            this.correctAnswers++;
            this.showResponse("correct")
        } else if (choice === "timeout") {
            this.unanswered++;
            this.showResponse("timeout")
        } else {
            this.incorrectAnswers++;
            this.showResponse("wrong")
        }

        this.countdown = setTimeout(() => {
            $("#main-row").empty()
            this.pickQuestion()
        }, 3000)
    }

    showResponse = (condition) => {
        let col = $("<div class='col-12'>")
        let jumbo = $("<div class='jumbotron'>")
        let correct = $("<h1>").text("Congratulations! You got the question right!")
        let wrong = $("<h1>").text(`Sorry, you picked the wrong answer. The correct answer is: `).append(`<p>${this.currentQuestion.answer}</p>`)
        let timeout = $("<h1>").text(`Whoops! You ran out of time! The correct answer is: `).append(`<p>${this.currentQuestion.answer}</p>`)
        if (condition === "wrong") {
            $("#main-row").append(col, jumbo.append(wrong))
        }
        if (condition === "correct") {
            $("#main-row").append(col, jumbo.append(correct))
        }
        if (condition === "timeout") {
            $("#main-row").append(col, jumbo.append(timeout))
        }
    }

}
let game;

function start(category) {
    $.ajax({
        url: `https://opentdb.com/api.php?amount=20&category=${category}&type=multiple`,
        complete: (result) => {
            game = new TriviaGame(result.responseJSON.results)
        }
    })
}

// Mythology:20
// Books:10
// Sports: 21
// Film: 11
// History: 23