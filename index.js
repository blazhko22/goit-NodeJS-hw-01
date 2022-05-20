const operations = require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const result = await operations.listContacts();

        console.table(result);
      break;

    case "get":
        const contact = await operations.getContactById(id);

        console.table(contact);
      break;

    case "add":
        await operations.addContact(name, email, phone);
        const newResult = await operations.listContacts();

        console.table(newResult);    
      break;

    case "remove":
        await operations.removeContact(id);
        const removeResult = await operations.listContacts();
         
        console.table(removeResult); 
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);