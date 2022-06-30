import {getCookie} from '../employee.js'

export function dailyReport() {
  //getting data from local storage
  let attendanceLocalStorage = JSON.parse(localStorage.getItem("attendance"));
  let departureLocalStorage = JSON.parse(localStorage.getItem("departure"));

  let userNameCookie = getCookie("userName");
  let fullNameCookie = getCookie("Name");
  let table = document.getElementById("table");

  table.innerHTML = "";

  let currentdate = new Date();
  let day = currentdate.getDate();
  let year = currentdate.getFullYear();
  let month = currentdate.getMonth();

  let currentDate = `${day}-${month + 1}-${year}`;

  for (let i = 0; i < attendanceLocalStorage.length; i++) {
    let row = document.createElement("tr");
    //data in array
    if (
      attendanceLocalStorage[i].username == userNameCookie &&
      attendanceLocalStorage[i].Date === currentDate
    ) {
      if (attendanceLocalStorage[i].LateAttend == true) {
        let data = document.createElement("td");
        data.innerText = `${fullNameCookie}, you are late today :(
            Is everything okay?
            
            If you need any help please contact HR employee 
            Maryam Gamal maryamalayaat@gmail.com`;
        row.appendChild(data);
      } else {
        let data = document.createElement("td");
        data.innerText = `Thank you for coming on time, ${fullNameCookie} Have a good day :)`;
        row.appendChild(data);
      }
      table.appendChild(row);
    }
  }

  for (let i = 0; i < departureLocalStorage.length; i++) {
    let row = document.createElement("tr");
    //data in array

    if (
      departureLocalStorage[i].username == userNameCookie &&
      departureLocalStorage[i].date === currentDate
    ) {
      if (departureLocalStorage[i].EarlyDeparture == true) {
        let data = document.createElement("td");
        data.innerText = `${fullNameCookie}, you are leaving early tody
        Don't forget to inform HR department your excuse
        Maryam Gamal maryamalayaat@gmail.com`;
        row.appendChild(data);
      } else {
        let data = document.createElement("td");
        data.innerText = `See you tomorrow, ${fullNameCookie} Have a good day :)`;
        row.appendChild(data);
      }
      table.appendChild(row);
    }
  }
  document.getElementById("table").appendChild(table);
} //end of dailyReport
