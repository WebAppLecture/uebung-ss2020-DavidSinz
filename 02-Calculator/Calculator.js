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
            let symbol = buttons[i].innerText;
            buttons[i].addEventListener("click", this.onButtonClick.bind(this, symbol));
        }
    }

    onButtonClick(symbol) {
        if (!isNaN(symbol)) {
            this.inputNum += symbol;
            this.print(this.inputNum);
        } else if (symbol === "AC") {
            this.clear();
        } else {
            this.calculate(symbol);
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
