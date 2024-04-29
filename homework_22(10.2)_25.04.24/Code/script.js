const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function getEvenNumbers(arr) {
    return arr.filter((elem) => (isFinite(elem) && !(elem % 2) && elem));
}

console.log('defaultArr: ', arr);

const even = getEvenNumbers(arr);

console.log('newArrEven: ', even); // [2, 4, 6, 8]