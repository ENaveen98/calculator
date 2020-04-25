import React from "react";
import logo from "./logo.svg";
import "./App.css";

function DoOperation(valueSoFar, number, operation) {
  valueSoFar = parseFloat(valueSoFar);
  number = parseFloat(number);
  switch (operation) {
    case "+":
      return valueSoFar + number;
      break;
    case "-":
      return valueSoFar - number;
      break;
    case "*":
      return valueSoFar * number;
      break;
    case "/":
      return valueSoFar / number;
      break;
  }
}

function doCalculation(inputString) {
  let specialRegex = /[\+\-\*\/]+[-][0-9\.]+/g;
  // console.log(inputString.match(specialRegex));
  let Regex = /[\+\-\*\/]+[0-9\.]+/g;
  // console.log(inputString.match(Regex));
  let startRegex = /^[0-9\.]+/;
  // console.log(inputString.match(startRegex));

  let opRegex = /[\+\-\*\/]+/;
  let spRegex = /[\+\-\*\/]+[-][0-9\.]+/;
  let opSingleRegex = /[\+\-\*\/]/g;
  let numRegex = /[0-9\.]+/;
  let valueSoFar = inputString.match(startRegex)[0];
  if (!Regex.test(inputString)) {
    return inputString;
  }
  for (let nextOp of inputString.match(Regex)) {
    if (spRegex.test(nextOp)) {
      // console.log("Extra Special", nextOp);
      let operators = nextOp.match(opSingleRegex);
      let operation = operators[operators.length - 2];
      let number = "-" + nextOp.match(numRegex)[0];
      // console.log(valueSoFar);
      // console.log(operation, number);
      valueSoFar = DoOperation(valueSoFar, number, operation);
      // console.log(valueSoFar);
    } else {
      // console.log("Not Special", nextOp);
      let operators = nextOp.match(opSingleRegex);
      let operation = operators[operators.length - 1];
      let number = nextOp.match(numRegex)[0];
      // console.log(valueSoFar);
      // console.log(operation, number);
      valueSoFar = DoOperation(valueSoFar, number, operation);
      // console.log(valueSoFar);
    }
    // let temp = 0;
  }
  return valueSoFar;
}

// doCalculation("5+5++5*8*-9***////-101");

function App() {
  return (
    <div className="App">
      <div className="calculator">
        <Calculator />
      </div>
    </div>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ],
      operators: [
        ["add", "+"],
        ["subtract", "-"],
        ["multiply", "*"],
        ["divide", "/"],
      ],
      decimal: ["decimal", "."],
      clear: ["clear", "clear"],
      displayText: "0",
    };
    this.enterNumber = this.enterNumber.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.enterOperation = this.enterOperation.bind(this);
    this.doMath = this.doMath.bind(this);
    this.enterDecimal = this.enterDecimal.bind(this);
  }

  clearDisplay() {
    this.setState({ displayText: "0" });
  }

  enterNumber(e) {
    this.setState((state) => {
      if (state.displayText === "0") {
        return { displayText: e.toString() };
      } else {
        return { displayText: state.displayText + e.toString() };
      }
    });
  }

  enterOperation(e) {
    this.setState((state) => {
      if (state.displayText === "0") {
        return { displayText: "0" };
      } else {
        return { displayText: state.displayText + e.toString() };
      }
    });
  }

  enterDecimal() {
    let numbersRegex = /[0-9\.]+/g;
    let numbersInDisplay = this.state.displayText.match(numbersRegex);
    let decimalRegex = /[\.]/;
    let finalNumber = numbersInDisplay[numbersInDisplay.length - 1];
    if (!decimalRegex.test(finalNumber)) {
      this.setState((state) => {
        return { displayText: state.displayText + "." };
      });
    } else {
      this.setState((state) => {
        return { displayText: state.displayText };
      });
    }
  }

  doMath() {
    this.setState((state) => {
      return { displayText: doCalculation(state.displayText).toString() };
    });
  }

  render() {
    return (
      <div id="calculator-elements">
        <button id="equals" onClick={this.doMath}>
          =
        </button>

        {this.state.numbers.map(function (element, index) {
          let html = (
            <Number
              number={index}
              numName={element}
              entering={this.enterNumber}
            />
          );
          index += 1;
          return html;
        }, this)}

        {this.state.operators.map(function (element) {
          let html = (
            <MathOperators
              symbol={element[1]}
              symName={element[0]}
              entering={this.enterOperation}
            />
          );
          return html;
        }, this)}

        <Decimal
          symbol={this.state.decimal[1]}
          symName={this.state.decimal[0]}
          entering={this.enterDecimal}
        />

        <Clear
          symbol={this.state.clear[1]}
          symName={this.state.clear[0]}
          clearDisplay={this.clearDisplay}
        />

        <div id="display">{this.state.displayText}</div>
      </div>
    );
  }
}

class Number extends React.Component {
  constructor(props) {
    super(props);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay() {
    this.props.entering(this.props.number);
  }

  render() {
    return (
      <div id={"div_" + this.props.numName}>
        <button id={this.props.numName} onClick={this.updateDisplay}>
          {this.props.number}
        </button>
      </div>
    );
  }
}

class MathOperators extends React.Component {
  constructor(props) {
    super(props);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay() {
    this.props.entering(this.props.symbol);
  }

  render() {
    return (
      <div id={"div_" + this.props.symName}>
        <button id={this.props.symName} onClick={this.updateDisplay}>
          {this.props.symbol}
        </button>
      </div>
    );
  }
}

class Clear extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={"div_" + this.props.symName}>
        <button id={this.props.symName} onClick={this.props.clearDisplay}>
          {this.props.symbol}
        </button>
      </div>
    );
  }
}

class Decimal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={"div_" + this.props.symName}>
        <button id={this.props.symName} onClick={this.props.entering}>
          {this.props.symbol}
        </button>
      </div>
    );
  }
}

export default App;
