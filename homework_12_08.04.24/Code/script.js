let userChoice = false;

do {
    let userNumber = prompt("Enter number do you want to check if it's prime: ");

    if (userNumber === null) {
        alert("Good Luck!");
        break;
    } else if (isNaN(+userNumber) || userNumber === "") {
        alert("Invalid number! Try again.");
    } else {
        userNumber = Number.parseInt(userNumber);

        let primeNumberFlag = true;

        for (let checkNumber = 2; checkNumber < userNumber; checkNumber++) {
            if (userNumber % checkNumber === 0) {
                primeNumberFlag = false;
                break;
            }
        }

        primeNumberFlag ? alert(`entered number ${userNumber} is prime!`) : alert(`entered number ${userNumber} is not prime!`);
    }

    userChoice = confirm("Do you want to check another number?");

} while (userChoice)
