const getlogin = document.querySelector("#login");
const getregister = document.querySelector("#register");
const getpage = document.querySelector("#page");

const toRegister = () => {
  getlogin.style.left = "-400px";
  getregister.style.left = "20px";
  getpage.className = "toggle-right";
};

const toLogin = () => {
  getlogin.style.left = "20px";
  getregister.style.left = "400px";
  getpage.className = "toggle-left";
};

// const login = async () => {
//   try {
//     const email = document.querySelector("#email").value;
//     const password = document.querySelector("#password").value;

//     const payload = { email, password };
//     const url = 'https://cop4331-g16.com/LAMPAPI/Login.php';

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();
//     if (data.id < 1) {
//       document.querySelector("#result").innerHTML("no match found");
//       return;
//     }
//     const { firstName, lastName } = data;
//     document.cookie = `firstName=${firstName}`;
// 	document.cookie = `lastName=${lastName}`;

	
	
//   } catch {
//     return "something went wrong";
//   }
// };


var urlBase = 'https://COP4331-g16.com/LAMPAPI';
var extension = 'php';

var userId = 0;
var status ="";


function doLogin()
{
	userId = 0;
	
	var login = document.getElementById("email").value;
	var password = document.getElementById("password").value;
//	var hash = md5( password );
	
	document.getElementById("result").innerHTML = "";

//	var jsonPayload = '{"Email" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"Email" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse( xhr.responseText );
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("errorMessageLogin").innerHTML = "Email or Password doesnt match any existing accounts";
			return;
		}
        // save userId to a cookie for later use
        document.cookie = userId;
	
		window.location.href = "example.html";
	}
	catch(err)
	{
		document.getElementById("result").innerHTML = err.message;
	}

}


function doRegister()
{
	userId = 0;
	status = "";
	
	var regEmail = document.getElementById("registerEmail").value;
	var RegisterPass = document.getElementById("registerPWD").value;
	var ConfirmPass = document.getElementById("confirmPWD").value;

	document.getElementById("result").innerHTML = "";

	// if password doesnt match in both field, send error message
	if (RegisterPass != ConfirmPass)
	{
		// document.getElementById("result").innerHTML = "Password doesnt match";
		document.getElementById("errorMessageRegister").innerHTML = "password doesn't match";
		return;
	}

	// Register the user
	else 
	{
		// clear previous error message
		document.getElementById("errorMessageRegister").innerHTML = "";

		var jsonPayload = '{"Email" : "' + regEmail + '", "Password" : "' + RegisterPass + '"}';
		var url = urlBase + '/Register.' + extension;

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

		try
		{
			xhr.send(jsonPayload);
	
			var jsonObject = JSON.parse( xhr.responseText );
			
			status = jsonObject.error;
			
			// check for errors
			if( status !== "" )
			{
				document.getElementById("errorMessageRegister").innerHTML = err.message;
				return;
			}
			
			// clear any errors
			document.getElementById("errorMessageRegister").innerHTML = "";
			
			// notify user the registration was succesful
			document.getElementById("Success").innerHTML = "Registration was successful!";
			
		}
		catch(err)
		{
			document.getElementById("result").innerHTML = err.message;
		}

	}

}


// function readCookie()
// {
    // 	userId = -1;
    // 	var data = document.cookie;
    // 	var splits = data.split(",");
    // 	for(var i = 0; i < splits.length; i++) 
    // 	{
    // 		var thisOne = splits[i].trim();
    // 		var tokens = thisOne.split("=");
    // 		if( tokens[0] == "firstName" )
    // 		{
    // 			firstName = tokens[1];
    // 		}
    // 		else if( tokens[0] == "lastName" )
    // 		{
    // 			lastName = tokens[1];
    // 		}
    // 		else if( tokens[0] == "userId" )
    // 		{
    // 			userId = parseInt( tokens[1].trim() );
    // 		}
    // 	}
	
    // 	if( userId < 0 )
    // 	{
    // 		window.location.href = "index.html";
    // 	}
    // 	else
    // 	{
    // 		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
    // 	}
// }
