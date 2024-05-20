"use strict";

class Student {
    constructor(firstName, lastName, birthYear, assessments = []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.gradesArr = assessments;
        this.presenceArr = new Array(25).fill(null);
    }

    getFullName() {
        return (this.firstName + " " + this.lastName);
    }

    getAge() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear;
    }

    getGradesAverage() {
        const sumGrades = this.gradesArr.reduce((gradesSum, currGrade) => {
            return gradesSum + currGrade;
        }, 0);

        return sumGrades / this.gradesArr.length;
    }

    getPresenceAverage() {
        const sumPresence = this.presenceArr.reduce((sumTrueDays, currDay) => {
            return sumTrueDays + currDay;
        }, 0);

        const sumDays = this.presenceArr.reduce((days, currDay) => {
            return (currDay !== null) ? ++days : days;
        }, 0);

        return sumPresence / sumDays;
    }

    present() {
        const nextFreeIndex = this.presenceArr.indexOf(null);

        if (nextFreeIndex <= this.presenceArr.length - 1 && nextFreeIndex !== -1) {

            if (nextFreeIndex === this.presenceArr.length - 1) console.log('Presence array is full');

            this.presenceArr[nextFreeIndex] = true;
        }

        return this;
    }

    absent() {
        const nextFreeIndex = this.presenceArr.indexOf(null);

        if (nextFreeIndex <= this.presenceArr.length - 1 && nextFreeIndex !== -1) {

            if (nextFreeIndex === this.presenceArr.length - 1) console.log('Presence array is full');

            this.presenceArr[nextFreeIndex] = false;
        }

        return this;
    }

    printSummary() {
        const averageFromPresence = this.getPresenceAverage(this.presenceArr);
        const averageFromGrades = this.getGradesAverage(this.gradesArr);

        if (averageFromGrades > 90 && averageFromPresence > 0.9) {
            return "Molodets!";
        } else if (averageFromGrades > 90 || averageFromPresence > 0.9) {
            return "Mojesh krasche!";
        } else
            return "Rediska!";
    }

    consolePrintFullInfo() {
        console.group('Student: ');
        console.log(this.getFullName());
        console.log(this.getAge() + ' years old');
        console.log('Average grade: ' + this.getGradesAverage().toFixed(2));
        console.log('Average presence: ' + this.getPresenceAverage().toFixed(2));
        console.log(this.printSummary());
        console.groupEnd();
    }
}

const student1 = new Student('Name1', 'Surname1', 1999, [90, 93, 70, 100, 80]);
const student2 = new Student('Name2', 'Surname2', 1998, [100, 100, 100, 95, 95, 95, 100, 80]);
const student3 = new Student('Name3', 'Surname3', 1995, [50, 100, 50, 95, 50, 95, 50]);
const student4 = new Student('Name4', 'Surname4', 1995, [100, 100, 95, 95, 100, 95, 100, 100, 100]);


student1.absent().present().present().absent().present().present().absent().present().present().absent().present().present().present();
student2.present().absent().present().absent().present().present().absent().present().present().absent().present().present().present().present().absent().present().absent();
student3.present().absent().present().absent().present().present().absent().present();
student4.present().present().present().present().present().present().present().present().present().present().present().present().present().present().absent().present().present().present();

student1.consolePrintFullInfo();
student2.consolePrintFullInfo();
student3.consolePrintFullInfo();
student4.consolePrintFullInfo();