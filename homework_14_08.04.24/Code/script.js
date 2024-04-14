const defaultArr = [{}, 1, 2, 1.5, " ", [], 2, 1, null, 3, 'string', NaN, 5, null];
const numericArray = prepareNumericArray(defaultArr);

console.log("Numeric array is: " + numericArray + "\nAverage from array is: " + averageFromArr(numericArray));

function averageFromArr(inputArr) {
    let sumArrElements = inputArr.reduce((accum, currElem) => accum + currElem, 0);

    return sumArrElements / inputArr.length;
}

function prepareNumericArray(inputArr) {
    return inputArr.filter((currElem) => typeof currElem === 'number' && !isNaN(currElem));
}