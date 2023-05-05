// import logo from './logo.svg';
import './App.css';
import React from "react"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionBoxText: "Click the button to start the game!",
            questionAnswer: 0,
            playerAnswer: "",

            score: 0,
            maxTime: 60,
            time: 60,

            difficulty: 0,
            numbers: "II",

            currentSign: "",
        }
        this.gameTimer = ""
    }

    gameStart(currentSign) {
        this.setState(function (state) {
            return {
                score: 0,
                time: state.maxTime,
            }
        })
        clearInterval(this.gameTimer)
        this.gameTimer = setInterval(() => {
            this.setState(function (state) {
                let questionBoxText = state.questionBoxText
                if (state.time < 2) {
                    clearInterval(this.gameTimer)
                    questionBoxText = "Game over!"
                }
                return {
                    time: state.time - 1,
                    questionBoxText: questionBoxText,
                }
            })
        }, 1000);
        this.questionStart(currentSign)
    }

    questionStart(sign) {
        this.setState(function (state) {
            let number1 = 0
            let number2 = 0
            let number3 = 0
            if (sign === "/") {
                number2 = Math.floor(Math.random() * 10 + 10)
                number1 = number2 * Math.floor(Math.random() * 10 + 10)
                if (state.difficulty === 0) {
                    number2 = Math.floor(Math.random() * 8 + 2)
                    number1 = number2 * Math.floor(Math.random() * 10 + 10)
                }
            }
            else if (sign === "*") {
                number1 = Math.floor(Math.random() * 18 + 2)
                number2 = Math.floor(Math.random() * 8 + 2)
                number3 = Math.floor(Math.random() * 8 + 2)

                if (state.difficulty === 1) {
                    number1 = Math.floor(Math.random() * 40 + 10)
                }
            }
            else if (sign === "-") {
                number1 = Math.floor(Math.random() * 119 + 1)
                number2 = Math.floor(Math.random() * 99 + 1)
                number3 = Math.floor(Math.random() * 99 + 1)

                if (state.difficulty === 0) {
                    number2 = Math.floor(Math.random() * number1 + 1)
                    number3 = Math.floor(Math.random() * (number1 - number2) + 1)
                }
            }
            else {
                number1 = Math.floor(Math.random() * 100)
                number2 = Math.floor(Math.random() * 100)
                number3 = Math.floor(Math.random() * 100)
                if (state.difficulty === 1) {
                    number1 = Math.floor(Math.random() * 200 + 100)
                    number2 = Math.floor(Math.random() * 90 + 10)
                    number2 = Math.floor(Math.random() * 90 + 10)
                }
            }

            let questionBoxText = number1 + sign + number2 + "=?"
            // eslint-disable-next-line
            let questionAnswer = eval(number1 + sign + number2)
            if (state.numbers === "III" && sign !== "/") {
            questionBoxText = number1 + sign + number2 + sign + number3 + "=?"
            questionAnswer = eval(number1 + sign + number2 + sign + number3)
            }
            console.log(questionAnswer)

            return {
                questionBoxText: questionBoxText,
                questionAnswer: questionAnswer,
                currentSign: sign,
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState(function (state) {
            console.log("answer submit");
            let score = state.score

            if (parseInt(state.playerAnswer) === state.questionAnswer) {
                console.log("question correct");
                score += 1
            }

            return {
                playerAnswer: "",
                questionAnswer: "",
                score: score,
            }
        }, function () {
            this.questionStart(this.state.currentSign)
        })
    }



    render() {
        return (
            <div>
                <form id="game" onSubmit={(e) => this.onSubmit(e)}>
                    <h1>Math Quiz</h1>
                    <h3>{this.state.questionBoxText}</h3>
                    <h2>{"Score: " + this.state.score}</h2>
                    <h2>{"time: " + this.state.time}</h2>
                    <input value={this.state.playerAnswer} onChange={(e) => this.setState({ playerAnswer: e.target.value })} type="text" placeholder="Your number"></input>
                    <button id="submitButton" className={this.state.buttonClass}></button>
                    <button id="restartButton" type="button" onClick={() => this.gameStart(this.state.currentSign)}></button>
                    <div className="buttons">
                        <button className={this.state.currentSign === "+" ? "activeButton" : ""} type="button" onClick={() => this.gameStart("+")}>+</button>
                        <button className={this.state.currentSign === "-" ? "activeButton" : ""} type="button" onClick={() => this.gameStart("-")}>-</button>
                        <button className={this.state.currentSign === "/" ? "activeButton" : ""} type="button" onClick={() => this.gameStart("/")}>/</button>
                        <button className={this.state.currentSign === "*" ? "activeButton" : ""} type="button" onClick={() => this.gameStart("*")}>*</button>
                    </div>
                    <div className="difficulties">
                        <button className={this.state.difficulty === 0 ? "activeButton" : ""} type="button" onClick={() => this.setState({ difficulty: 0 })}>Easy</button>
                        <button className={this.state.difficulty === 1 ? "activeButton" : ""} type="button" onClick={() => this.setState({ difficulty: 1 })}>Hard</button>
                        <button onClick={() => this.setState(function (state) {return{numbers: state.numbers === "II" ? "III" : "II"}})} type="button">{this.state.numbers}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default App;