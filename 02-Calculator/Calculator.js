import {MyMath} from "../01-MyMath/MyMath.js";

export class Calculator {

    constructor(numPad, outputCalculation, outputSolution) {
        this.numPad = numPad;
        this.outputCalculation = outputCalculation;
        this.outputSolution = outputSolution;
        this.myMath = new MyMath();
        this.inputNum = "";
        this.operator = "";
        this.setupNumPad();
    }

    setupNumPad() {
        let buttons = this.numPad.children;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", this.onButtonClick.bind(this));
        }
    }

    onButtonClick(symbol) {
        let input = symbol.target.innerText;
        if (!isNaN(input)) {
            this.inputNum += input;
            this.print(this.inputNum);
        } else if (input === "AC") {
            this.clear();
        } else {
            this.calculate(input);
        }
    }

    calculate(operator) {
        if (this.operator !== "") {
            if (this.operator === "+") {
                this.myMath.add(parseInt(this.inputNum));
            } else if (this.operator === "-") {
                this.myMath.subtract(parseInt(this.inputNum));
            } else if (this.operator === "x") {
                this.myMath.multiply(parseInt(this.inputNum));
            } else if (this.operator === "/") {
                this.myMath.divide(parseInt(this.inputNum));
            }
        } else {
            this.myMath.value = parseInt(this.inputNum);
        }
        this.print("");
        this.printSolution(this.myMath.value);
        this.inputNum = "";
        this.operator = operator;
        
    }

    print(string) {
        this.outputCalculation.innerHTML = string;
    }

    printSolution(string) {
        this.outputSolution.innerHTML = string;
    }

    clear() {
        this.inputNum = "";
        this.myMath.value = 0;
        this.operator = "";
        this.print('');
        this.printSolution('');
    }

}
