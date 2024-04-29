# HW10.1

## Картка користувача

Створіть об'єкт, що містить інформацію про користувача, таку як ім'я, вік, місце проживання тощо. Створіть метод об'єкту для отримання та відображення цих даних.

** Створіть функцію конструктор на базі якої будуть створені обʼєкти користувачів

```js
function User(name, surname) {
    // youre awesome code here
}

User.prototype.getInfo = () => {
    return {
        name: this.name,
        surname: this.surname
    }
}

const user = new User();
```