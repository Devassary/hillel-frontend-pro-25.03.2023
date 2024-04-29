function User(name, surname, year, country) {
    this.name = name;
    this.surname = surname;
    this.yearOfBirth = year;
    this.country = country;
}

User.prototype.getInfo = function () {
    return {
        name: this.name,
        surname: this.surname,
        yearOfBirth: this.yearOfBirth,
        country: this.country,
    };
}

User.prototype.showInfo = function () {

    for (let key of Object.keys(this)) {
        console.log(key, '=>', this[key]);
    }
}

const userAlex = new User('Alex', 'Alexov', '1999', ['Ukraine', 'USA']);

console.log(userAlex.getInfo());

userAlex.showInfo();