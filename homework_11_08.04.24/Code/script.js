let maxSquareLimit = prompt("Enter a number that will be max limit for calculation square of numbers from 1 to 100:");

if (maxSquareLimit === null) {
    alert("Good Luck!");
} else if (isNaN(+maxSquareLimit) || maxSquareLimit === "") {
    alert("Invalid number! Refresh the page for new try.");
} else {
    maxSquareLimit = Number.parseInt(maxSquareLimit);

    let resultNumbers = "";

    for (let numToSquare = 1; numToSquare <= 100 && numToSquare ** 2 < maxSquareLimit; numToSquare++) {
        resultNumbers += `${numToSquare} ** 2 = ${numToSquare ** 2}\n`;
    }

    console.log(resultNumbers);
}