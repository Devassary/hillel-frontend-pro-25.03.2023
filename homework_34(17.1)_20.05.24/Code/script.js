"use strict";

class Calculator {

    add(operand1, operand2) {
        if(Number.isFinite(operand1) && Number.isFinite(operand1)) {
            return operand1 + operand2;
        }

        return null;
    }

    subtract(operand1, operand2) {
        if(Number.isFinite(operand1) && Number.isFinite(operand1)) {
            return operand1 - operand2;
        }

        return null;
    }

    multiply(operand1, operand2) {
        if(Number.isFinite(operand1) && Number.isFinite(operand1)) {
            return operand1 * operand2;
        }

        return null;
    }

    divide(operand1, operand2) {
        if(Number.isFinite(operand1) && Number.isFinite(operand1) && operand2 !== 0) {
            return operand1 / operand2;
        }

        return null;
    }
}

const calc = new Calculator();

console.log(calc.add(5, 3));
console.log(calc.subtract(10, 4));
console.log(calc.multiply(3, 6));
console.log(calc.divide(8, 2));