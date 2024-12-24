// Select display and buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // Current number being entered
let previousInput = ""; // Previous number
let operator = null; // Current operator

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Event listener for button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "C") {
            // Clear everything
            currentInput = "";
            previousInput = "";
            operator = null;
            updateDisplay("0");
        } else if (value === "=") {
            // Perform calculation
            if (currentInput && previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                operator = null;
                previousInput = "";
                updateDisplay(currentInput);
            }
        } else if (["+", "-", "*", "/"].includes(value)) {
            // Handle operator
            if (currentInput) {
                if (previousInput && operator) {
                    // Perform calculation and chain operators
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                operator = value; // Set the new operator
                previousInput = currentInput;
                currentInput = "";
            } else if (!previousInput) {
                // Allow operators to work after the first input
                operator = value;
                previousInput = "0";
            }
            // Display the operator pressed
            updateDisplay(operator);
        } else {
            // Handle numbers or decimal point
            if (value === "." && currentInput.includes(".")) return;
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Function to perform calculations
function calculate(a, b, operator) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (operator) {
        case "+":
            return (numA + numB).toString();
        case "-":
            return (numA - numB).toString();
        case "*":
            return (numA * numB).toString();
        case "/":
            return numB !== 0 ? (numA / numB).toString() : "Error";
        default:
            return "0";
    }
}
