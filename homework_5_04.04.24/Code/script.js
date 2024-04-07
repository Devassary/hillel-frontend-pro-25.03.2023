let numToInspect = prompt("Hello! Please enter a three-digit number:");

if (isNaN(+numToInspect)) {
    alert(`Error! Entered value ${numToInspect} is not a number! Refresh the page for one more try!`);
} else if (numToInspect.length < 3 || numToInspect.length > 3) {
    alert(`Error! Entered value ${numToInspect} has invalid length! Refresh the page for one more try!`);
} else {
    if (numToInspect.includes(numToInspect[0], 1) || numToInspect.includes(numToInspect[1], 2)) {
        if (numToInspect[0] === numToInspect[1] && numToInspect[1] === numToInspect[2]) {
            alert("All digits of the entered number are the same.");
        } else {
            alert("Only two digits of the entered number are the same.");
        }
    } else {
        alert("No digit matches in the entered number.");
    }
}

