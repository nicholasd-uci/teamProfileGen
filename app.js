const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Employee = require('./lib/Employee.js')

const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employees = []

const buildManager = employee => {
    prompt([
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter your Office Number:'
        }
    ])
    .then(({ officeNumber }) => {
        employees.push(new Manager(employee.name, employee.email, employee.id, officeNumber))
        subMenu()
    })
    .catch(err => console.log(err))

}

const buildEngineer = employee => {
    prompt([
        {
            type: 'input',
            name: 'github',
            message: 'Enter your your employee github username'
        }
    ])
    .then(({ github }) => {
        employees.push(new Engineer(employee.name, employee.email, employee.id, github))
        subMenu()
    })
    .catch(err => console.log(err))
}

const buildIntern = employee => {
    prompt([
        {
            type: 'input',
            name: 'school',
            message: 'What school do you attend?'
        }
    ])
    .then(({ school }) => {
        employees.push(new Intern(employee.name, employee.email, employee.id, school))
        subMenu()
    })
    .catch(err => console.log(err))
}

const subMenu = () => {
    prompt({
        type: 'list',
        name: 'action',
        choices: ['Create New Account', 'Login to Account'],
        message: 'Would you like to make another account or Login to a current account? ',
    })
    .then(({ action }) => {
        switch (action) {
            case 'Create New Account':
                mainMenu()
                break
            case 'Login to Account':
                const html = render(employees)
                fs.writeFileSync(outputPath, html)
                break
        }

    })
    .catch(err => console.log(err))
}

const mainMenu = () => {
    prompt([
        {
            type: 'list',
            name: 'type',
            choices: ['Manager', 'Engineer', 'Intern'],
            message: 'Welcome, what is your employee role?'
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter your employee name:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your employee email address:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter your employee id:'
        }
    ])
    .then(employee => {
        switch (employee.type) {
            case 'Manager':
                buildManager(employee)
                break
            case 'Engineer':
                buildEngineer(employee)
                break
            case 'Intern':
                buildIntern(employee)
                break
        }
    })
    .catch(err => console.log(err))
}

mainMenu()

