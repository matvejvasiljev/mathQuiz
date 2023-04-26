// import logo from './logo.svg';
import './App.css';
import React from "react"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionBoxText: "Click the button to start the game!",
            questionAnswer: 0,

            score: 0,
            time: 60,
        }
    }

    questionStart(sign) {
        this.setState(function (state) {
            let number1 = Math.floor(Math.random() * 100)
            let number2 = Math.floor(Math.random() * 100)
            let questionBoxText = number1 + sign + number2
            // eslint-disable-next-line
            let questionAnswer = eval(questionBoxText)
            console.log(questionAnswer)

            return {
                questionBoxText: questionBoxText,
                questionAnswer: questionAnswer,
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState(function (state) {
            console.log("answer submit");
            let score = state.score

            if (0 === state.questionAnswer) {
                console.log("question correct");
                score += 1
            }

            return {
                questionAnswer: 6,
                score: score,
            }
        })
    }

    render() {
        return (
            <div>
                <form id="game" onSubmit={(e) => this.onSubmit(e)}>
                    <h1>Math Quiz</h1>
                    <h3>{this.state.questionBoxText + "=?"}</h3>
                    <h2>{"Score: " + this.state.score}</h2>
                    <h2>{"time: " + this.state.time}</h2>
                    <input type="text" placeholder="Your number" />
                    {/* <button id="submitButton" onSubmit={(evt) => this.onSubmit(evt)}></button> */}
                    <button id="submitButton" ></button>
                    <div className="buttons">
                        <button type="button" onClick={() => this.questionStart("+")}>+</button>
                        <button type="button" onClick={() => this.questionStart("-")}>-</button>
                        <button type="button" onClick={() => this.questionStart("/")}>/</button>
                        <button type="button" onClick={() => this.questionStart("*")}>*</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default App;