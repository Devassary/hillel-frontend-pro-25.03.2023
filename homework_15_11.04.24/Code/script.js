const defaultArr = [1, 3, 4, 6, 2, 5, 7, 2];
const elementToDelete = 4;

let arrayWithoutElem = removeElemFromArr(defaultArr, elementToDelete) ?? "Invalid input data";

console.log("Default array is: " + defaultArr + "\nNew array without element is: " + arrayWithoutElem);

function removeElemFromArr(inputArr, itemToDelete) {

    if (inputArr.indexOf(itemToDelete) !== -1) {
        let arrayToDeleteElem = inputArr.slice();

        arrayToDeleteElem.splice(arrayToDeleteElem.indexOf(itemToDelete), 1);

        return arrayToDeleteElem;
    } else
        return inputArr;
}