import {getCookie} from '../employee.js'

export function monthlyReport() {
  //getting data from local storage
  let attendanceLocalStorage = JSON.parse(localStorage.getItem("attendance"));
  let departureLocalStorage = JSON.parse(localStorage.getItem("departure"));

  let userNameCookie = getCookie("userName");
  let table = document.getElementById("table");

  table.innerHTML = "";

  //array of headers we need
  let headers = [
    "Date",
    "Attendance Time",
    "Late attend",
    "Departure Time",
    "Early Departure",
  ];

  //draw table headers
  let row = document.createElement("tr");
  for (let i = 0; i < headers.length; i++) {
    let header = document.createElement("th");
    header.innerText = headers[i];
    row.appendChild(header);
  }
  table.appendChild(row);

  //find all attendance records for this username
  let attendanceArr = [];
  for (let i = 0; i < attendanceLocalStorage.length; i++) {
    if (attendanceLocalStorage[i].username == userNameCookie) {
      attendanceArr.push(attendanceLocalStorage[i]);
    }
  }

  //find all departure records for this username
  let departureArr = [];
  for (let i = 0; i < departureLocalStorage.length; i++) {
    if (departureLocalStorage[i].username == userNameCookie) {
      departureArr.push(departureLocalStorage[i]);
    }
  }

  //TODO: attendance here will be wrong if some one attend but didn't departure
  for (let i = 0; i < attendanceArr.length; i++) {
    let row = document.createElement("tr");
    //data in array
    for (let s in attendanceArr[i]) {
      if (s != "username") {
        if (attendanceArr[i].username == userNameCookie) {
          let data = document.createElement("td");
          data.innerText = attendanceArr[i][s];
          row.appendChild(data);
        }
      }
    }

    for (let s in departureArr[i]) {
      if (s != "username" && s != "Date") {
        if (departureArr[i].username == userNameCookie) {
          let data = document.createElement("td");
          data.innerText = departureArr[i][s];
          row.appendChild(data);
        }
      }
    }
    table.appendChild(row);
  }
  document.getElementById("table").appendChild(table);
} // end of monthlyReport
