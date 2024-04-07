let helloStr = "Hello, John! How are you?";
let userName = prompt("What is your name?");

userName = userName.trim();

if (userName === null || userName === '') {
    alert("It's a pity you didn't want to enter your name!");
} else {
    alert(helloStr.replace("John", userName));
}