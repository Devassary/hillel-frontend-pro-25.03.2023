const company = {
    sales: [
        {name: 'Jhon', salary: 1000},
        {name: 'Alice', salary: 600},
        {name: 'Bob', salary: 1200},
        {
            slaves: [
                {name: 'Jhon', salary: 0},
                {name: 'Alice', salary: 500},
            ],
            slaves2: [
                {name: 'Jhon', salary: 1000},
                {name: 'Alice', salary: 500},
            ],
        },
        {name: 'Bob', salary: 1200},
    ],
    development: {
        web: [
            {name: 'Peter', salary: 2000},
            {name: 'Alex', salary: 1800},
            {name: 'Max', salary: 600},
        ],
        internals: [
            {name: 'Jack', salary: 1300}
        ]
    }
};

function totalSalaries(dataFromCompany) {
    let salarySum = 0;

    if (typeof dataFromCompany !== "object") {
        return salarySum;
    }

    for (let key in dataFromCompany) {
        if (dataFromCompany[key] !== null && dataFromCompany[key].hasOwnProperty('salary')) {
            salarySum += dataFromCompany[key].salary;
        } else {
            salarySum += totalSalaries(dataFromCompany[key]);
        }
    }

    return salarySum;
}

const total = totalSalaries(company);
console.log(total);