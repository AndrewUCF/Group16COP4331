const displayRegister = () => {
  const area = document.querySelector("#form-area");
  area.innerHTML = `
    <div class="icon-image">
    <img src="registerIcon.jpg" alt="Register Here" class="icon" />
  </div>
  <h1>Register</h1>
  <form action="">
    <div class="formContainer">
      <p>Email Address</p>
      <input type="text" id="email" placeholder="Email Address" />
    </div>
    <div class="formContainer">
      <p>Password</p>
      <input type="password" id="password" placeholder="Password" />
    </div>
    <div class="formContainer">
      <p>Confirm Password</p>
      <input
        type="password"
        id="confirm-password"
        placeholder="Confirm Password"
      />
    </div>
    <div class="sign-up-div" onClick="displayLogin()">
      Already have an account? Sign in!
    </div>
    <br />
    <button type="button" class="btn btn-primary" onClick="doRegister()" style="width: 100%;">
      Sign up!
    </button>
  </form>
    `;
};

const displayLogin = () => {
  const area = document.querySelector("#form-area");
  area.innerHTML = `
    <div class="icon-image">
    <img src="loginIcon.jpg" alt="Login" class="icon" />
  </div>
  <h1>Login</h1>
  <form action="">
    <div class="formContainer">
      <p>Email Address</p>
      <input type="text" id="email" placeholder="Email Address" />
    </div>
    <div class="formContainer">
      <p>Password</p>
      <input type="password" id="password" placeholder="Password" />
    </div>
    <div class="sign-up-div" onClick="displayRegister()">
      New to CelesteMeet? Sign up!
    </div>
    <br />
    <button type="button" class="btn btn-primary" onClick="doLogin()" style="width: 100%;">Sign in</button>
  </form>
    `;
};

const displayMessage = (color, messageText) => {
  const message = document.querySelector("#message");
  message.style.color = color;
  message.innerHTML = messageText;
  setTimeout(() => {
    message.innerHTML = "";
  }, 5000);
};

const doLogin = () => {
  const url = `https://COP4331-g16.com/LAMPAPI/Login.php`;
  const login = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const payload = { Email: login, password: password };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.error) {
        displayMessage("crimson", response.error);
        return false;
      }
      document.cookie = `email=${login}`;
      document.cookie = `userID=${response.id}`;
      displayMessage("Lawngreen", "Log in Successful. Logging in...");
      setTimeout(() => {
        window.location.replace("https://cop4331-g16.com/home/");
      }, 1500);
    }
  };
  xhr.send(JSON.stringify(payload));
};

const doRegister = () => {
  const url = `https://cop4331-g16.com/LAMPAPI/Register.php`;
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const confirm = document.querySelector("#confirm-password").value.trim();

  const payload = { Email: email, Password: password, confirm };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.error) {
        displayMessage("crimson", response.error);
        return false;
      }
      displayMessage("Lawngreen", "Successfully Registered. Logging in...");
      document.cookie = `email=${email}`;
      document.cookie = `userID=${response.id}`;
      setTimeout(() => {
        window.location.replace("https://cop4331-g16.com/home/");
      }, 1000);
    } else {
      displayMessage("crimson", "Internal Server Error");
    }
  };
  xhr.send(JSON.stringify(payload));
};

const onMount = () => {
    const cookies = document.cookie.split('; ');
    for (let cook of cookies) {
        document.cookie = `${cook}; expires=Thu, 18 Dec 2013 12:00:00 UTC;`;
    }
}
