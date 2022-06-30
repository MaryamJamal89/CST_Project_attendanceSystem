//get employee list from local storage
let localStorageParse = JSON.parse(localStorage.getItem("user"));

//event listener to login btn
document.getElementById("loginbtn").addEventListener("click", getInfo);

function getInfo() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let span = document.getElementById("errorMssg");

  function redirect(url) {
    window.location.href = url;
  }

  for (let i = 0; i < localStorageParse.length; i++) {
    // check is user input matches username and password of a current index of the objPeople array
    if (
      username == localStorageParse[i].username &&
      password == localStorageParse[i].password
    ) {
      span.style.display = "none";
      //Redirect
      if (localStorageParse[i].type === "admin") {
        redirect("../../Screens/AdminScreen/adminScreen.html");
      } else if (localStorageParse[i].type === "security") {
        redirect("../../Screens/SecurityScreen/securityScreen.html");
      } else {
        //create cookies
        document.cookie = `Name=${localStorageParse[i].firstName} ${localStorageParse[i].lastName};`;
        document.cookie = `userName=${localStorageParse[i].username};`;
        redirect("../../Screens/LogInScreen/employeeScreen.html");
      }
      // stop the function if this is found to be true
      return;
    }
  }
  span.style.display = "block";
} //end of getInfo

export * as login from "./Login.js";
