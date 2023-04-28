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

            difficulty: 1,

            currentSign: "+",
        }
        this.gameTimer = ""
    }

    gameStart(currentSign) {
        this.setState(function (state) {
            return{
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
            if (sign === "/") {
                number2 = Math.floor(Math.random() * 48 + 2)
                number1 = number2 * Math.floor(Math.random() * 8 + 2)
            }
            else if (sign === "*") {
                number1 = Math.floor(Math.random() * 18 + 2)
                number2 = Math.floor(Math.random() * 8 + 2)
            }
            else {
                number1 = Math.floor(Math.random() * 100)
                number2 = Math.floor(Math.random() * 100)
            }

            let questionBoxText = number1 + sign + number2 + "=?"
            // eslint-disable-next-line
            let questionAnswer = eval(number1 + sign + number2)
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
                    {/* <button id="submitButton" onSubmit={(evt) => this.onSubmit(evt)}></button> */}
                    <button id="submitButton" className={this.state.buttonClass}></button>
                    <button id="restartButton" type="button" onClick={() => this.gameStart(this.state.currentSign)}></button>
                    <div className="buttons">
                        <button type="button" onClick={() => this.gameStart("+")}>+</button>
                        <button type="button" onClick={() => this.gameStart("-")}>-</button>
                        <button type="button" onClick={() => this.gameStart("/")}>/</button>
                        <button type="button" onClick={() => this.gameStart("*")}>*</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default App;