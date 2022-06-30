window.addEventListener("load", function () {
  //add click EventListener to attend btn
  let btncheck = this.document.getElementById("attend");
  btncheck.addEventListener("click", attendEmp);
}); //end of load listner

//get users from localstorage
let localStorageParse = JSON.parse(localStorage.getItem("user"));

//drop down list
let mylist = document.getElementById("attendemp");
for (let i = 0; i < localStorageParse.length; i++) {
  let newOption = document.createElement("option");
  newOption.innerText = localStorageParse[i].username;
  mylist.appendChild(newOption);
}

//global var
//offical working hours
const dayStartHours = 8;
const dayEndHours = 15;
//earlyDepature & lateAttend flags
let earlyDepature = false;
let lateAttend = false;

function attendEmp() {
  //load local storage
  let departureLocalstorage = JSON.parse(localStorage.getItem("departure"));
  let attendanceLocalstorage = JSON.parse(localStorage.getItem("attendance"));
  //load select input value
  let empuser = document.getElementById("attendemp").value;
  //get time & date
  let currentdate = new Date();
  let day = currentdate.getDate();
  let year = currentdate.getFullYear();
  let month = currentdate.getMonth();
  let hours = currentdate.getHours();
  let min = currentdate.getMinutes();
  let date = `${day}-${month + 1}-${year}`;
  let time = `${hours}:${min}`;

  for (let i = 0; i < localStorageParse.length; i++) {
    //check if he is employee
    if (empuser == localStorageParse[i].username) {
      //call EmployeeState function
      EmployeeState(
        departureLocalstorage,
        attendanceLocalstorage,
        empuser,
        date,
        time,
        hours
      );
    } else {
      continue;
    }
  }
}

function EmployeeState(
  departureLocalstorage,
  attendanceLocalstorage,
  empuser,
  date,
  time,
  hours
) {
  //check if emp attend late
  if (hours > dayStartHours && hours < dayEndHours) {
    lateAttend = true;
  }

  for (let j = 0; j < attendanceLocalstorage.length; j++) {
    //if the emp entered for the 2nd time in the same day
    if (
      attendanceLocalstorage[j].Date === date &&
      attendanceLocalstorage[j].username === empuser
    ) {
      //check if the emp is already checked out
      for (let i = 0; i < departureLocalstorage.length; i++) {
        if (
          departureLocalstorage[i].Date === date &&
          departureLocalstorage[i].username === empuser
        ) {
          alert("You already checked out ");
          return;
        }
      }
      depature(departureLocalstorage, empuser, date, time, hours);
      return;
    }
  }
  //otherwise chick him in
  check_in(
    attendanceLocalstorage,
    departureLocalstorage,
    empuser,
    date,
    time,
    hours
  );
} //end of EmployeeState

//this function to check if emp check in or out
function check_in(
  attendanceLocalstorage,
  departureLocalstorage,
  empuser,
  date,
  time,
  hours
) {
  lateAttend = false;
  //early depature code
  if (hours < dayEndHours && hours > dayStartHours) {
    lateAttend = true;
  }

  attendanceLocalstorage.push({
    username: empuser,
    Date: date,
    Time: time,
    LateAttend: lateAttend,
  });

  localStorage.setItem("attendance", JSON.stringify(attendanceLocalstorage));
  setTimeout(function () {
    depature(departureLocalstorage, empuser, date, time, hours);
  }, 2.52e7); //2.52e7 = 7 hours
  alert(" Check in ");
} // end of check_in function

function depature(departureLocalstorage, empuser, date, time, hours) {
  earlyDepature = false;
  console.log("Checked Out !!");

  if (hours < dayEndHours && hours > dayStartHours) {
    earlyDepature = true;
  }

  departureLocalstorage.push({
    username: empuser,
    Date: date,
    Time: time,
    EarlyDepature: earlyDepature,
  });

  localStorage.setItem("departure", JSON.stringify(departureLocalstorage));
  alert(" Check out ");
} // end of depature function
