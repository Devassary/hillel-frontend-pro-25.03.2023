let number = 1;
let string = `string`;
let bigInt = 10n;
let bool = false;
let obj = {};
let symb = Symbol();
let nuLL = null;
let undef = undefined;

console.log(
    typeof(number),
    typeof(string),
    typeof(bigInt),
    typeof(bool),
    typeof(obj),
    typeof(symb),
    typeof(nuLL),
    typeof(undef)
);

/* ---------------------------- or ------------------------------ */

console.log(
    typeof(1),
    typeof(`smstr123`),
    typeof(10n),
    typeof(true),
    typeof({name:"John", age: 30}),
    typeof(Symbol()),
    typeof(null),
    typeof(undefined)
);