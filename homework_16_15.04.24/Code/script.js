function sumFunc() {
    let result = 0;

    return function (num) {
        return result += num;
    };
}

let sum = sumFunc();

console.log(sum(4)); // 4
console.log(sum(6)); // 10
console.log(sum(10)); // 20
console.log(sum(7)); // 27