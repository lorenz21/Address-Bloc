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
                    "Add new contact"
                    ,"Today's Date"
                    ,"View all contacts"
                    ,"Search for Contacts"
                    ,"Exit"
                ]
            }
        ];
        this.contacts = [];
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
                case "Search for Contacts":
                    this.search();
                    break;
                case "View all contacts":
                    this.getContacts();
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
            this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
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
<<<<<<< HEAD
		return this.remindMeText[0];
=======
        return "Learning is a life-long pursuit";
>>>>>>> checkpoint-2-testing
    }

    getContacts(){
		this.clear();
		this.book.getContacts().then((contacts) => {
			for(let contact of contacts) {
				this._printContact(contact);
			}
			this.main();
		}).catch((err) => {
			console.log(err);
			this.main();
		});
    }

	
    search(){
      inquirer.prompt(this.book.searchQuestions)
      .then((target) => {
       this.book.search(target.name)
       .then((contact) => {
          if(contact === null){
            this.clear();
            console.log("contact not found");
            this.search();
          } else {
         	this.showContact(contact);
         }

        });
     })
     .catch((err) => {
       console.log(err);
       this.main();
     });
    }

    showContact(contact){
		  this._printContact(contact);
		  inquirer.prompt(this.book.showContactQuestions)
		  .then((answer) => {
			  switch(answer.selected){
				  case "Delete contact":
					this.delete(contact);
					break;
				  case "Main menu":
				  	this.main();
				 	break;
				  default:
					console.log("Something went wrong.");
					this.showContact(contact);
			  }
		  })
		  .catch((err) => {
			  console.log(err);
			  this.showContact(contact);
		  });
    }

    _printContact(contact){
		console.log(`
			name: ${contact.name}
			phone number: ${contact.phone}
			email: ${contact.email}
			-------------`
		);
	 }
	 
	 delete(contact){
		 inquirer.prompt(this.book.deleteConfirmQuestions)
		 .then((answer) => {
			if(answer.confirmation){
				this.book.delete(contact.id);
				console.log("contact deleted!");
				this.main();
			}
			else{
				console.log("contact not deleted");
				this.showContact(contact);
			}
		 })
		 .catch((err) => {
			 console.log(err);
			 this.main();
		 });
	 }
}