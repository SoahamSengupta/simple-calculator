const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let calculated = false;
const operators = ["+", "-", "X", "/", "%"];

// AUTO FONT RESIZE
function adjustFontSize() {

    let fontSize = 11;

    display.style.fontSize = fontSize + "vh";

    while (
        display.scrollWidth > display.clientWidth &&
        fontSize > 2
    ) {
        fontSize -= 0.5;
        display.style.fontSize = fontSize + "vh";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {

        let value = button.innerText;

        if (value === "AC") {
            display.innerText = "0";
            display.style.fontSize = "11vh";
        }

        else if (value === "DE") {

            display.innerText =
                display.innerText.slice(0, -1);

            if (display.innerText === "") {
                display.innerText = "0";
            }
        }

        else if (value === "=") {

            try {
                let expression =
                    display.innerText.replaceAll("X", "*");

                display.innerText =
                    eval(expression);

                calculated = true;
            }

            catch {
                display.innerText = "Error";
            }
        }

        else if (display.innerText === "0" || calculated) {
            display.innerText = value;
            calculated = false;
        }

        else {

            const lastCharacter =
                display.innerText.slice(-1);

            if (
                operators.includes(lastCharacter) &&
                operators.includes(value)
            ) {
                return;
            }

            display.innerText += value;
        }

        adjustFontSize();
    });
});

window.addEventListener("keydown", (event) => {

    let key = event.key;

    let displayValue = key;

    if (key === "*") {
        displayValue = "X";
    }

    if ("0123456789+-*/.%".includes(key)) {

        const lastCharacter =
            display.innerText.slice(-1);

        if (
            operators.includes(lastCharacter) &&
            operators.includes(displayValue)
        ) {
            return;
        }

        if (display.innerText === "0") {
            display.innerText = displayValue;
        }

        else if (calculated) {

            if ("0123456789".includes(displayValue)) {
                display.innerText = displayValue;
            }

            else {
                display.innerText += displayValue;
            }

            calculated = false;
        }

        else {
            display.innerText += displayValue;
        }

    }

    else if (key === "Escape") {
        display.innerText = "0";
        display.style.fontSize = "11vh";
    }

    else if (key === "Backspace") {

        display.innerText =
            display.innerText.slice(0, -1);

        if (display.innerText === "") {
            display.innerText = "0";
        }

    }

    else if (key === "Enter") {

        try {

            let expression =
                display.innerText.replaceAll("X", "*");

            display.innerText =
                eval(expression);

            calculated = true;

        }

        catch {

            display.innerText = "Error";

        }

    }

    adjustFontSize();
});