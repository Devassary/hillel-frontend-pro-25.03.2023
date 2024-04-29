let contacts = [
    {
        name: "Serhii",
        phone: "+380999999999",
        email: "example@email.com",
    },
    {
        name: "Alex",
        phone: "+38088888888",
        email: "example@email.com",
    },
    {
        name: "Vera",
        phone: "+38077777777",
        email: "example@email.com",
    },
];

function Contact({name, phone, email}) {
    this.name = name;
    this.phone = phone;
    this.email = email;
}

function ContactBook(contactsArray) {
    this.contacts = [];
    if (Array.isArray(contactsArray) && contactsArray.every((elem) => (elem instanceof Contact))) {
        this.contacts = contactsArray;
    }
}

ContactBook.prototype.addContact = function (newContact) {
    if (newContact instanceof Contact) {
        this.contacts.push(newContact);
    }
}

ContactBook.prototype.findContactByName = function (nameToSearch = "") {
    nameToSearch = nameToSearch.toString().toUpperCase();
    return this.contacts.filter((elem) => (elem.name.toUpperCase() === nameToSearch));
}

ContactBook.prototype.showAtConsoleAllContacts = function () {
    for (let contact of this.contacts) {
        console.log(contact);
    }
}

let formattedContacts = contacts.map((elem) => {
    return new Contact(elem);
});

let myContactBook = new ContactBook(formattedContacts);

const contactVera = new Contact({name: "Vera", phone: "+38055555555", email: "example@email.com"});

myContactBook.addContact(contactVera);

myContactBook.showAtConsoleAllContacts();

let searchName = "Vera";
let searchContacts = myContactBook.findContactByName(searchName);

console.log(`Found ${searchContacts.length} contact/s with name ${searchName}:\n`, searchContacts);