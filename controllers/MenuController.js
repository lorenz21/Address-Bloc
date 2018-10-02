const inquirer = require('inquirer');
const moment = require('moment');
const ContactController = require("./ContactController");

module.exports = class MenuController {
    constructor(){
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option below: ",
                choices: [
                    "Add new contact",
                    "Today's Date",
                    "Exit"
                ]
            }
        ];
        this.remindMeText = [];
        this.book = new ContactController();
    }
    main(){
        console.log("Welcome to AddressBloc!");
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch(response.mainMenuChoice){
                case "Add new contact":
                    this.addContact();
                    break;
                case "Today's Date":
                    this.getDate();
                    break;
                case "Exit":
                    this.exit();
                default:
                console.log("Invaild entry!");
                this.main();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    clear(){
        console.log("\x1Bc");
    }
    
    addContact(){
        this.clear();
        inquirer.prompt(this.book.addContactQuestions).then((answers) => {
            this.book.addContact(answers.name, answers.phone, answers.emails).then((contact) => {
                console.log("Contact added successfully!");
                this.main();
            }).catch((err) => {
                console.log(err);
                this.main();
            });
        });
    }

    getDate(){
        let today = moment().format("LL");
        this.clear();
        console.log(`Date: ${today}`);
        this.main();
    }

    exit(){
        console.log("Thanks for using Address Bloc");
        process.exit();
    }

    getContactCount(){
        return this.contacts.length;
    }

    remindMe(){
        return this.remindMeText[0];
    }
}