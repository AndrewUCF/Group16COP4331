// maxerr100;
let currentid;

// perfect
const getUser = () => {
  const cookies = document.cookie.split("; ");
  const userEmail = cookies
    .find((cookie) => cookie.startsWith("email="))
    .split("=")[1];
  const userID = cookies
    .find((cookie) => cookie.startsWith("userID="))
    .split("=")[1];
  return { userID, userEmail };
};

// should work after figure out searchContacts
const renderContacts = (contacts) => {
  const contactDiv = document.querySelector("#contact");
  contactDiv.innerHTML = "";
  console.log('rendering contacts...');
  for (let contact of contacts) {
     console.log(contact);
    contactDiv.innerHTML += `<h5 id="${contact.id}" class="displayName" onClick="displayCard('${contact.First_name}', '${contact.Last_name}', ${contact.Phone_number}, '${contact.Email}', ${contact.id})" >${contact.First_name} ${contact.Last_name}</h5>`;
  }
};

// problems array does not show to have elements
const searchContacts = (str) => {
    const search = str;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://cop4331-g16.com/LAMPAPI/SearchContact.php", true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.error) return console.log(`error: ${response.error}`);
      let contact = response.results;
      const contactDiv = document.querySelector("#contact");
      contactDiv.innerHTML = "";
      // renders the contacts from search results
      for (let i = 0; i < contact.length; i++) {
          contactDiv.innerHTML +=
          `<h5 id="${contact[i].id}" class="displayName"
                                    onClick="displayCard('${contact[i].First_name}', '${contact[i].Last_name}', ${contact[i].Phone_number}, '${contact[i].Email}', ${contact[i].id})"
                                    >${contact[i].First_name} ${contact[i].Last_name}</h5>`;
      }
      console.log(response.results);
      console.log(JSON.parse(JSON.stringify(response.results)));
      
    //   renderContacts(response.results);
    } else {
      displayMessage("red", "something went wrong");
    }
  };
  const userId = getUser().userID;
  console.log(typeof search);
  console.log(userId);
  console.log(JSON.stringify({userId, search}));
  xhr.send(JSON.stringify({ userId, search}));
};

// perfect
const displayAddForm = (style) => {
  document.querySelector("#addContact").style.display = style;
};

// perfect
const addContact = () => {
  const First_name = document.querySelector("#fname").value.trim();
  const Last_name = document.querySelector("#lname").value.trim();
  const Email = document.querySelector("#email").value.trim();
  const Phone_number = document.querySelector("#phone").value.trim();
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cop4331-g16.com/LAMPAPI/AddContactV.php", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayAddForm("none");
      if (response.error !== "") return console.log(response.error);

      const newContact = {
        First_name,
        Last_name,
        Email,
        Phone_number,
        id: response.Contact_ID,
      };
      postContact(newContact);
      console.log(newContact);
      // displayMessage("green", "successfully added contact");
    } else {
      displayMessage("red", "something went wrong");
    }
  };
  const User_ID = getUser().userID;
  const payload = { First_name, Last_name, Phone_number, Email, User_ID };
  xhr.send(JSON.stringify(payload));
};

//perfect
const postContact = (contact) => {
  document.querySelector(
    "#contact"
  ).innerHTML += `<h5 id="${contact.id}" class="displayName" onClick="displayCard('${contact.First_name}', '${contact.Last_name}', ${contact.Phone_number}, '${contact.Email}', ${contact.id})">${contact.First_name} ${contact.Last_name}</h5>`;
};

// perfect
const displayCard = (First_name, Last_name, Phone_number, Email, id) => {
  currentid = id;
  document.querySelector("#card-body").innerHTML = `
    <div class="card-buttons">
    <button class="btn btn-danger" onClick="deleteContact(${id})">
      <i class="fa fa-trash" aria-hidden="true"></i>
    </button>
    <button class="btn btn-success" onClick="displayEditForm('grid')">
      <i class="fas fa-edit"></i>
    </button>
  </div>

  <div class="card-text">
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

// perfect!
const deleteContact = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "https://cop4331-g16.com/LAMPAPI/DeleteContact.php", true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.error !== "") return console.log(response.error);
      document.querySelector("#card-body").innerHTML = "";
      console.log("successfully deleted contact");
      document.getElementById(id).remove();
      // displayMessage(
      //   "green",
      //   `successfully deleted contact: ${fname} ${lname}`
      // );
    } else {
      displayMessage("red", "something went wrong");
    }
  };
  const payload = { Contact_ID:  id };
  xhr.send(JSON.stringify(payload));
};

// perfect
const displayEditForm = (style) => {
  document.querySelector("#editContact").style.display = style;
};

// works perfectly
const updateContact = () => {
  const First_name = document.querySelector("#upFname").value.trim();
  const Last_name = document.querySelector("#upLname").value.trim();
  const Phone_number = document.querySelector("#upPhone").value.trim();
  const Email = document.querySelector("#upEmail").value.trim();
  const User_ID = getUser().userID;
  const payload = { First_name, Last_name, Phone_number, Email, User_ID, Contact_ID: currentid };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cop4331-g16.com/LAMPAPI/UpdateContactV.php",true);
  xhr.onload = () => {
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
      const response = JSON.parse(xhr.responseText);
      if (response.error) return console.log(response.error);
      displayCard(First_name, Last_name, Phone_number, Email, response.Contact_ID);
      document.getElementById(response.Contact_ID).remove();
      postContact({First_name, Last_name, Phone_number, Email, id: response.Contact_ID});
      displayEditForm('none');
    } else {
      displayMessage("red", "something went wrong");
    }
  };
  xhr.send(JSON.stringify(payload));
};

// should be good when searchContacts work
const userSearch = () => {
  const str = document.querySelector("#search").value;
  searchContacts(str);
};


// test later
const displayMessage = (color, messageText) => {
  const message = document.querySelector("#message");
  message.innerHTML = messageText;
  message.style.background = color;
  message.style.removeProperty("display");
  setTimeout(() => {
    message.style.display = "none";
  }, 2500);
};

// perfect
const signout = () => {
  const { userEmail, userID } = getUser();
  document.cookie = `email=${userEmail};expires=Thu, 01 Jan 1970 00:00:01 GMT"`;
  document.cookie = `userID=${userID};expires=Thu, 01 Jan 1970 00:00:01 GMT"`;
  window.location.replace("https://cop4331-g16.com/");
};

// should be good once searchContacts works
const onMount = () => {
  document.querySelector("#user").innerHTML = getUser().userEmail;
  searchContacts("");
};
