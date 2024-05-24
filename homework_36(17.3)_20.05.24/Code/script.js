"use strict";

class BankAccount {
    #balance = 0;

    constructor(balance) {
        if (Number.isFinite(balance) && balance >= 0)
            this.#balance = balance;
    }

    get balance() {
        return this.#balance;
    }

    deposit(amount) {
        if (Number.isFinite(amount) && amount > 0)
            this.#balance += amount;
    }

    withdraw(amount) {
        if (Number.isFinite(amount) && amount <= this.#balance && amount > 0)
            this.#balance -= amount;
    }
}

const account1 = new BankAccount(1000);


console.log(account1.balance); // 1000
account1.deposit(500);
console.log(account1.balance); // 1500
account1.withdraw(200);
console.log(account1.balance); // 1300