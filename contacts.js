const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const result = JSON.parse(data);
        return result;
    } catch (error) {
        console.log(error);
    }
}
  
async function getContactById(contactId) {
    try {
        const allContacts = await listContacts();
        const contact = allContacts.find(contact => contact.id ===contactId);
        return contact ? contact : null; 
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const allContacts = await listContacts();
        const index = allContacts.findIndex(contact => contact.id === contactId);
        const deletedContact = allContacts[index];
        if(index !== -1) {
            allContacts.splice(index, 1);
            await fs.writeFile(contactsPath, JSON.stringify(allContacts));
        }
        return deletedContact ? deletedContact : null; 
    } catch (error) {
        console.log(error);
    }
}
  
async function addContact(name, email, phone) {
    try {
        const newContact = {
            id: uuid.v4(),
            name: name,
            email: email,
            phone: phone,
        };
        const allContacts = await listContacts();
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts)); 
    } catch (error) {
        console.log(error);
    }    
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}