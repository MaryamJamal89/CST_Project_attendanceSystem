import { activeEmployees } from "./Screpts/Component/activeEmployees.js";

window.addEventListener("load", function () {
  //Load activeEmployees to localStorage for the first use only
  if (localStorage.getItem("user") === null) {
    localStorage.setItem("user", JSON.stringify(activeEmployees));
  }
  if (localStorage.getItem("attendance") === null) {
    localStorage.setItem("attendance", JSON.stringify([]));
  }
  if (localStorage.getItem("departure") === null) {
    localStorage.setItem("departure", JSON.stringify([]));
  }
  if (localStorage.getItem("pending") === null) {
    localStorage.setItem("pending", JSON.stringify([]));
  }
  
  window.location.href = "./Screens/LogInScreen/Login.html";
});//end of load addEventListener
