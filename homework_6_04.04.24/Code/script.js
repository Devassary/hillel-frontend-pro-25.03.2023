const userBirth = prompt("Please enter your year of birth:");

if (!userBirth) {
    alert("It's a pity you didn't want to enter your year of birth!");
} else if (isNaN(+userBirth) || userBirth < 1900 || userBirth > 2024) {
    alert("The year of birth is incorrect!");
} else {
    const userCity = prompt("What city are you from?");

    if (!userCity) {
        alert("It's a pity you didn't want to enter what city are you from!");
    } else {
        const userSport = prompt("What is your favourite sport?");

        if (!userSport) {
            alert("It's a pity you didn't want to enter what city are you from!");
        } else {

            const userAge = 2024 - userBirth;
            const citiesCompare = "Kyiv, Washington, London";
            const sportsCompare = "Biathlon, Billiards, Canoeing";
            let userResultInfo = `Your age is ${userAge}.\n`;

            if (citiesCompare.includes(userCity)) {
                userResultInfo += "You live in the capital of ";
                userResultInfo += userCity.includes("Kyiv") ? "Ukraine.\n" :
                                    userCity.includes("Washington") ? "USA.\n" : "Great Britain.\n";
            } else {
                userResultInfo += `You live in ${userCity}.\n`;
            }

            if (sportsCompare.includes(userSport)) {
                userResultInfo += "WOW! Do you want to become ";
                userResultInfo += userSport.includes("Biathlon") ? "Johannes Thingnes Bø?!\n" :
                                    userSport.includes("Billiards") ? "David Causier?!\n" : "Oleh Kukharyk?!\n";
            } else {
                userResultInfo += `Your favourite sport is ${userSport}.\n`;
            }

            alert(userResultInfo);

        }
    }

}