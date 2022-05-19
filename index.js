const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const getContactsAll = async () => {
    const contactsData = await fs.readFile(contactsPath, 'utf-8');
    const data = JSON.parse(contactsData); 
    return data;
    
}
// getContactsAll().then(velue => console.log(velue));

const contactsCreate = async (name, email, phone) => {
    const newContact = {
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone,
    };
    const allContacts = await getContactsAll();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
}
contactsCreate('Yriu Blazhko', 'blazhko22@gmail.com', '(098) 985-5874')