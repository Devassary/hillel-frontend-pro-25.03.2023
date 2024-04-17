function product(firstFactor) {
    return function (secondFactor) {
        return firstFactor * secondFactor;
    };
}

const result = product(7)(2);

console.log(result);