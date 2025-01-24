const API_URL = 'http://localhost:3000/contacts'; // JSON Server endpoint

// DOM Elements
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const saveButton = document.getElementById('saveButton');
const contactsList = document.getElementById('contacts');

// Fetch and display contacts
async function fetchContacts() {
  try {
    const response = await fetch(API_URL);
    const contacts = await response.json();
    renderContacts(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
}

// Render contacts in the list
function renderContacts(contacts) {
  contactsList.innerHTML = ''; // Clear the list
  contacts.forEach((contact) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div id='li-content'>
        <strong>${contact.name}</strong><br>
        ${contact.phone}<br>
        ${contact.email}
      </div>
      <button class="delete-button" data-id="${contact.id}">Delete</button>
      <button class="edit-button" data-id="${contact.id}">Edit</button>
    `;
    contactsList.appendChild(li);
  });
}

// Event delegation for delete and edit buttons
contactsList.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('delete-button')) {
    deleteContact(e.target.dataset.id);
  } else if (e.target && e.target.classList.contains('edit-button')) {
    editContact(e.target.dataset.id);
  }
});

// Add or update a contact
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form submission

  const contact = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
  };

  try {
    if (saveButton.innerText === 'Save Contact') {
      // Add new contact
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
    } else {
      // Update existing contact
      const id = saveButton.dataset.id;
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      saveButton.innerText = 'Save Contact'; // Reset button text
    }

    fetchContacts(); // Refresh the contact list
    contactForm.reset(); // Clear the form
  } catch (error) {
    console.error('Error saving contact:', error);
  }
});

// Delete a contact
async function deleteContact(id) {
  console.log('Deleting contact with id:', id); // For debugging
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchContacts(); // Refresh the contact list
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
}

// Edit a contact
async function editContact(id) {
  console.log('Editing contact with id:', id); // For debugging
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const contact = await response.json();
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    saveButton.innerText = 'Update Contact';
    saveButton.dataset.id = id; // Store the contact ID for updating
  } catch (error) {
    console.error('Error editing contact:', error);
  }
}

// Initial fetch and render
fetchContacts();