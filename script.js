document.addEventListener("DOMContentLoaded", function () {
    const displayHeadNumber1 = document.querySelector(".HeadNumber-1");
    const displayHeadNumber2 = document.querySelector(".HeadNumber-2");
    const clearButton = document.querySelector(".clear");
    const deleteButton = document.querySelector(".delete");
    const operationButtons = document.querySelectorAll(".operation");
    const numberButtons = document.querySelectorAll(".number");
    const equalButton = document.querySelector(".equal");

    let currentInput = "";
    let previousInput = "";
    let currentOperation = null;

    function updateDisplay() {
        displayHeadNumber1.textContent = currentInput;
        displayHeadNumber2.textContent = currentOperation ? `${previousInput} ${currentOperation}` : "";
    }

    function clearCalculator() {
        currentInput = "";
        previousInput = "";
        currentOperation = null;
        updateDisplay();
    }

    function deleteLastDigit() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function handleNumberClick(number) {
        currentInput += number;
        updateDisplay();
    }

    function handleOperationClick(operation) {
        if (currentInput !== "") {
            if (previousInput !== "") {
                calculate();
            }
            currentOperation = operation;
            previousInput = currentInput;
            currentInput = "";
            updateDisplay();
        }
    }

    function calculate() {
        let result;
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        if (isNaN(num1) || isNaN(num2)) {
            clearCalculator();
            return;
        }

        switch (currentOperation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    clearCalculator();
                    return;
                }
                break;
            default:
                return;
        }

        clearCalculator();
        currentInput = result.toString();
        updateDisplay();
    }

    // Event listeners
    clearButton.addEventListener("click", clearCalculator);
    deleteButton.addEventListener("click", deleteLastDigit);

    numberButtons.forEach(button => {
        button.addEventListener("click", () => handleNumberClick(button.textContent));
    });

    operationButtons.forEach(button => {
        button.addEventListener("click", () => handleOperationClick(button.textContent));
    });

    equalButton.addEventListener("click", calculate);
});
