
//event listener to signup btn
document.getElementById("user_input").addEventListener("click", registerUser);

//add a addEventListener to contact-form's submit btn
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  }); // end of submit addEventListener

function registerUser() {
  //get employee list from local storage
  let localStorageParse = JSON.parse(localStorage.getItem("user"));
  let pendingLocalStorage = JSON.parse(localStorage.getItem("pending"));

  //extract data from inputs
  let firstName_toGenerate = document.getElementById("firstName").value;
  let Firstname = document.getElementById("firstName").value;
  let Lastname = document.getElementById("lastName").value;
  let Address = document.getElementById("address").value;
  let Email = document.getElementById("user_email").value;
  let Dob = document.getElementById("age").value;

  // email validations
  // loop through activeEmployees to check duplication
  for (let i = 0; i < localStorageParse.length; i++) {
    if (Email === localStorageParse[i].email) {
      // alert user that the username is take
      alert("Email is already There, please try other one");
      // stop the statement if result is found true
      return;
    }
  } // end of for loop

  // loop through pendingEmployees to check duplication
  for (let i = 0; i < pendingLocalStorage.length; i++) {
    // inputs validations
    if (Email === pendingLocalStorage[i].email) {
      // alert user that the username is take
      alert("Email is already There in pending, please try other mail");
      // stop the statement if result is found true
      return;
    }
  } // end of for loop

  // inputs validations
  if (Email === "") {
    alert("Email is empty");
    // stop the statement if result is found true
    return;
  }
  if (Firstname == "") {
    alert("name is empty");
    // stop the statement if result is found true
    return;
  }
  if (Lastname == "") {
    alert("name is empty");
    // stop the statement if result is found true
    return;
  }
  if (Address == "") {
    alert("address is empty");
    // stop the statement if result is found true
    return;
  }
  if (Dob == "") {
    alert("age is empty");
    // stop the statement if result is found true
    return;
  }

  //genrated User
  let randomstring = Math.random().toString(36).slice(-5);
  let genratedUsername = firstName_toGenerate + randomstring;
  //genrated Password
  let randomPassword = Math.random().toString(36).slice(-10);

  //create new user object
  let newUser = {
    username: genratedUsername,
    password: randomPassword,
    email: Email,
    type: "employee",
    firstName: Firstname,
    lastName: Lastname,
    address: Address,
    age: Dob,
  };

  //push the new user to pending localStorage waiting for the admin to activate him.
  pendingLocalStorage.push(newUser);
  localStorage.setItem("pending", JSON.stringify(pendingLocalStorage));
  alert("your account is waiting for admin to activate");
  window.location.href = '../../Screens/LogInScreen/Login.html'
} // end of registerUser function
