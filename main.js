// const RealizeKeys = (value){
//     if (value === "clear") {
//         input = "";
//         displayInput.innerHTML = "";
//         displayOutput.innerHTML = "";
//     } else if (value === "backspace") {
//         input = input.slice(0, -1);
//         displayInput.innerHTML = CleanInput(input);
//     } else if (value === "=") {
//         let result = eval(PrepareInput(input));
//         displayOutput.innerHTML = CleanOutput(result);
//     } else if (value === "parentesis") {
//         if (input.indexOf("(") === -1 || (input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") < input.lastIndexOf(")"))) {
//             input += "(";
//         } else if (
//             (input.indexOf("(") !== -1 && input.indexOf(")") === -1) || (input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") > input.lastIndexOf(")"))
//         ) {
//             input += ")";
//         }
//         displayInput.innerHTML = CleanInput(input);
//     } else {
//         if (ValidateInput(value)) {
//             input += value;
//             displayInput.innerHTML = CleanInput(input);
//         }
//     }
// };
// grab keys

const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');


// Putting in Array 
function CleanInput(input) {
	let inputArray = input.split("");
	let inputArray_length = inputArray.length;

	for (let i = 0; i < inputArray_length; i++) {
		switch (inputArray[i]) {
			case "*":
				inputArray[i] = ` <span class="operator">x</span> `;
				break;
			case "/":
				inputArray[i] = ` <span class="operator">÷</span> `;
				break;
			case "+":
				inputArray[i] = ` <span class="operator">+</span> `;
				break;
			case "-":
				inputArray[i] = ` <span class="operator">-</span> `;
				break;
			case "(":
				inputArray[i] = `<span class="parentesis">(</span>`;
				break;
			case ")":
				inputArray[i] = `<span class="parentesis">)</span>`;
				break;
			case "%":
				inputArray[i] = `<span class="percent">%</span>`;
				break;
		}
	}


	return inputArray.join("");
}

// Out of Array 
function CleanOutput (output) {
	let outputString = output.toString();
	let decimal = outputString.split(".")[1];
	outputString = outputString.split(".")[0];

	let outputArray = outputString.split("");
	
	if (outputArray.length > 3) {
		for (let i = outputArray.length - 3; i > 0; i -= 3) {
			outputArray.splice(i, 0, ",");
		}
	}

//When Decimal 
	if (decimal) {
		outputArray.push(".");
		outputArray.push(decimal);
	}

	return outputArray.join("");
}
//Vailidate Input
function ValidateInput (value) {
	let lastInput = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	if (value === "." && lastInput === ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(lastInput)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}

function PrepareInput (input) {
	let inputArray = input.split("");

	for (let i = 0; i < inputArray.length; i++) {
		if (inputArray[i] === "%") {
			inputArray[i] = "/100";
		}
	}

	return inputArray.join("");
}

let input = "";
// gather keys 
for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		switch (value) {
			case "clear":
				input = "";
				displayInput.innerHTML = "";
				displayOutput.innerHTML = "";
				break;
			case "backspace":
				input = input.slice(0, -1);
				displayInput.innerHTML = CleanInput(input);
				break;
			case "=":
				let result = eval(PrepareInput(input));
				displayOutput.innerHTML = CleanOutput(result);
				break;
			case "parentesis":
				if (input.indexOf("(") === -1 || (input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") < input.lastIndexOf(")"))) {
					input += "(";
				} else if ((input.indexOf("(") !== -1 && input.indexOf(")") === -1) || (input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") > input.lastIndexOf(")"))) {
					input += ")";
				}
				displayInput.innerHTML = CleanInput(input);
				break;
			default:
				if (ValidateInput(value)) {
					input += value;
					displayInput.innerHTML = CleanInput(input);
				}
		}
	});

}
