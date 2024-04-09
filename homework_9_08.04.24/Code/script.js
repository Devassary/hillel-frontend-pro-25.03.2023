const minLimit = 20;
const maxLimit = 30;

let resultString = "";

for (let counter = minLimit; counter <= maxLimit; counter += 0.5) {
    resultString += counter.toString() + " ";
}

console.log(resultString);