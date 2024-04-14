const userString = prompt("Enter your string").trim();

if (verifyInputStr(userString)) {
    const userChars = prompt("Enter the characters you want to delete separated by a space").trim();

    if (verifyInputStr(userChars)) {
        const charsArr = prepareCharArr(userChars);
        const resultStr = excludeCharsFromStr(userString, charsArr);

        alert("Your string now looks like: " + resultStr);
    }
}

function verifyInputStr(receivedStr) {
    switch (receivedStr) {
        case null:
            alert("Good luck!");
            return false;
        case "":
            alert("You entered empty string. Refresh the page for one more try.");
            return false;
        default:
            return receivedStr;
    }
}

function prepareCharArr(inputChars){
    let charsArr = [];

    if (inputChars.length > 1) charsArr = inputChars.split(" ");
    else inputChars.push(userChars);

    return charsArr;
}

function excludeCharsFromStr(string, chars) {
    let tempStr = "";

    for (let char of chars) {

        for (let i = 0; i < string.length; i++) {
            if (string[i] !== char)
                tempStr += string[i];
        }

        string = tempStr;
        tempStr = "";
    }

    return string;
}