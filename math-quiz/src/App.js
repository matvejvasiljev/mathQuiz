import logo from './logo.svg';
import './App.css';
import React from "react";
import "./App.sass";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                <form id="game">
                    <h1>Math Quiz</h1>
                    <h3>Click the button to start the game!</h3>
                    <h2>Score: 0</h2>
                    <h2>Time: 60</h2>
                    <input type="text" placeholder="Your number" />
                    <button>+</button>
                    <button>-</button>
                    <button>/</button>
                    <button>*</button>
                </form>
            </div>
        )
    }
}

export default App;