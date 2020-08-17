// these are being called from the lib
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



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
