let currentid;
let currentFname;
let currentLname;
let currentPnum;
let currentEmail;

const removeForm = () => {
  if (currentid) {
    displayCard(
      currentFname,
      currentLname,
      currentPnum,
      currentEmail,
      currentid
    );
  } else {
    document.querySelector("#card-body").innerHTML = "";
  }
};

const displayEditForm = () => {

  const cardBody = document.querySelector("#card-body");
  cardBody.innerHTML = `
      <div class="displayForm">
      <div class="exit">
          <i class="fas fa-long-arrow-alt-left fa-3x" onClick="removeForm()"></i>
      </div>
      <h5>Edit Contact</h5>
    <div class="form-container">
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">First Name</label>
            <input type="text" class="form-control" id="upFname" value="${currentFname}" required>
          </div>
          <div class="form-group col-md-6">
            <label for="last name">Last name</label>
            <input type="text" class="form-control" id="upLname" value="${currentLname}" required>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" class="form-control" id="upEmail" value="${currentEmail}" required>
        </div>
        <div class="form-group">
          <label for="Phone Number">Phone Number</label>
          <input type="text" class="form-control" id="upPhone" value="${currentPnum}" required>
        </div>
        
        <button type='reset' class="btn btn-success" onClick="updateContact()" style="width: 100%">Update Contact</button>
      </form>
    </div>
    </div>
  `;

};

const displayMessage = (color, messageText) => {
  const message = document.querySelector("#message");
  message.innerHTML = messageText;
  message.style.background = color;
  message.style.removeProperty("display");
  setTimeout(() => {
    message.innerHTML = "";
    message.style.display = "none";
  }, 2500);
};

const getUser = () => {
  const cookies = document.cookie.split("; ");
  if (
    cookies.find((cookie) => cookie.startsWith("email=")) === undefined ||
    cookies.find((cookie) => cookie.startsWith("userID=")) === undefined
  )
    window.location.replace("https://cop4331-g16.com/");
  const userEmail = cookies
    .find((cookie) => cookie.startsWith("email="))
    .split("=")[1];
  const userID = cookies
    .find((cookie) => cookie.startsWith("userID="))
    .split("=")[1];
  return { userID, userEmail };
};

const signout = () => {
  const { userEmail, userID } = getUser();
  document.cookie = `email=${userEmail};expires=Thu, 01 Jan 1970 00:00:01 GMT"; path=/;domain=https://cop4331-g16.com/`;
  document.cookie = `userID=${userID};expires=Thu, 01 Jan 1970 00:00:01 GMT"; path=/; domain=https://cop4331-g16.com/`;
  window.location.replace("https://cop4331-g16.com/");
};

const renderContacts = (contacts) => {
  const contactDiv = document.querySelector("#contact");
  contactDiv.innerHTML = "";
  for (let contact of contacts) {
    postContact(contact);
  }
};

const displayAddForm = () => {
  const cardBody = document.querySelector("#card-body");
  cardBody.innerHTML = `
      <div class="displayForm">
      <div class="exit">
          <i class="fas fa-long-arrow-alt-left fa-3x" onClick="removeForm()"></i>
      </div>
      <h5>Add Contact</h5>
    <div class="form-container">
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">First Name</label>
            <input type="text" class="form-control" id="fname" placeholder="First Name" required>
          </div>
          <div class="form-group col-md-6">
            <label for="last name">Last name</label>
            <input type="text" class="form-control" id="lname" placeholder="Last Name" required>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" class="form-control" id="email" placeholder="Email Address" required>
        </div>
        <div class="form-group">
          <label for="Phone Number">Phone Number</label>
          <input type="text" class="form-control" id="phone" placeholder="e.g. xxx-xxx-xxxx" required>
        </div>
  
        <button type='reset' class="btn btn-primary" onClick="addContact()" style="width: 100%">Add Contact</button>
      </form>
    </div>
    </div>
  `;
};

const postContact = (contact) => {
  document.querySelector(
    "#contact"
  ).innerHTML += `<p id="${contact.Contact_ID}" class="displayName" onClick="displayCard('${contact.First_name}', '${contact.Last_name}', '${contact.Phone_number}', '${contact.Email}', ${contact.Contact_ID})">${contact.First_name}\t${contact.Last_name}</p>`;
};

const displayCard = (First_name, Last_name, Phone_number, Email, id) => {
  if (currentid) {
      document.getElementById(currentid).style.fontWeight = '';
      document.getElementById(currentid).style.fontSize = '20px';
  }
  currentid = id;
  currentFname = First_name;
  currentLname = Last_name;
  currentPnum = Phone_number;
  currentEmail = Email;
  document.getElementById(currentid).style.fontWeight = 'bold';
  document.getElementById(currentid).style.fontSize = '28px';


document.querySelector("#card-body").innerHTML = `
  <div class="card-buttons">
  <button class="btn btn-danger" onClick="displayDeleteConfirmation()">
    <i class="fa fa-trash" aria-hidden="true"></i>
  </button>
  <button class="btn btn-success" onClick="displayEditForm()">
    <i class="fas fa-edit"></i>
  </button>
</div>

<div class="card-text">
  <div class="confirm-delete" id="confirm-delete" style="display: none;">
      Are You Sure You want to delete this Contact?
      <br>
      <button class="btn btn-primary" onClick="deleteContact(${id})">Yes</button>
      <button class="btn btn-danger" onClick="removeDeleteConfirmation()">No</button>
  </div>
  <h3>${First_name} ${Last_name}</h3>
</div>
<div class="card-text">
  <h5>Phone Number: ${Phone_number}</h3>
  </div>
  <div class="card-text">
    <h5>Email Address: ${Email}</h3>
    </div>
  </div>
  `;
};

const displayDeleteConfirmation = () => {
  const confirmation = document.querySelector('#confirm-delete');
  confirmation.style.removeProperty('display');
};

const removeDeleteConfirmation = () => {
  const confirmation = document.querySelector('#confirm-delete');
  confirmation.style.display = 'none';
};

const deleteContact = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "https://cop4331-g16.com/LAMPAPI/DeleteContact.php", true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.error) return displayMessage('crimson', response.error);
      document.getElementById(id).remove();
      document.querySelector("#card-body").innerHTML = "";
       displayMessage("LawnGreen",'Successfully Deleted Contact');
       currentid = undefined;
    } else {
      displayMessage("red", "Unable To Delete Contact");
    }
  };
  const payload = { Contact_ID:  id };
  xhr.send(JSON.stringify(payload));
};

const updateContact = () => {
  const First_name = document.querySelector("#upFname").value.trim();
  const Last_name = document.querySelector("#upLname").value.trim();
  const Phone_number = document.querySelector("#upPhone").value.trim();
  const Email = document.querySelector("#upEmail").value.trim();
  const User_ID = getUser().userID;
  const payload = { First_name, Last_name, Phone_number, Email, User_ID, Contact_ID: currentid };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cop4331-g16.com/LAMPAPI/UpdateContact.php",true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (response.error) return displayMessage('crimson', response.error);
      currentid = response.Contact_ID;
      currentFname = First_name;
      currentLname = Last_name;
      currentPnum = Phone_number;
      currentEmail = Email;
      displayEditForm();
      displayMessage('LawnGreen', 'Successfully Updated Contact');
      document.getElementById(response.Contact_ID).remove();
      postContact({First_name, Last_name, Phone_number, Email, Contact_ID: response.Contact_ID});
      displayCard(First_name, Last_name, Phone_number, Email, response.Contact_ID);
    } else {
      displayMessage("crimson", "Unable To Update Contact");
    }
  };
  xhr.send(JSON.stringify(payload));
};

const addContact = () => {
  const First_name = document.querySelector("#fname").value.trim();
  const Last_name = document.querySelector("#lname").value.trim();
  const Email = document.querySelector("#email").value.trim();
  const Phone_number = document.querySelector("#phone").value.trim();
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cop4331-g16.com/LAMPAPI/AddContact.php", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.error) return displayMessage('crimson', response.error)
      displayAddForm();

       displayMessage("LawnGreen", "Successfully Added Contact");
      const newContact = {
        First_name,
        Last_name,
        Email,
        Phone_number,
        Contact_ID: response.Contact_ID,
      };
      postContact(newContact);
    } else {
      displayMessage("crimson", "Unable To Add Contact");
    }
  };
  const User_ID = getUser().userID;
  const payload = { First_name, Last_name, Phone_number, Email, User_ID };
  xhr.send(JSON.stringify(payload));
};

const searchContacts = (str) => {
  const search = str;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cop4331-g16.com/LAMPAPI/SearchContact.php", true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.error) return displayMessage('crimson', response.error);
      renderContacts(response.results);
    } else {
      displayMessage("crimson", "Search is currently Unavailable");
    }
  };
  const userId = getUser().userID;
  xhr.send(JSON.stringify({ userId, search}));
};

const userSearch = () => {
  const str = document.querySelector("#search").value;
  currentid = undefined;
  searchContacts(str);
};

const onMount = () => {
  document.querySelector("#user").innerHTML = getUser().userEmail;
  searchContacts("");
};