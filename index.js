const { program } = require("commander");
const Func = require("./contacts.js");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await Func.listContacts();
      return list;

    case "get":
      const contact = await Func.getContactById(id);
      return contact;

    case "add":
      const newContact = await Func.addContact(name, email, phone);
      return newContact;

    case "remove":
      const removedContact = await Func.removeContact(id);
      return removedContact;
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options).then(console.log).catch(console.error);
