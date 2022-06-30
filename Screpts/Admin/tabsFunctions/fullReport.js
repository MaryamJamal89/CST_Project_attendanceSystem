export function fullReport() {
  //get data from local storages
  let localStorageParse = JSON.parse(localStorage.getItem("user"));
  // let pendingLocalstorage = JSON.parse(localStorage.getItem("pending"));
  let attendanceLocalstorage = JSON.parse(localStorage.getItem("attendance"));
  let departureLocalstorage = JSON.parse(localStorage.getItem("departure"));

  let arr = [
    "FirstName",
    "LastName",
    "Day",
    "AttendanceTime",
    "LateAttendance",
    "DepartureTime",
    "EarlyDeparture",
  ];
 
  let table = document.getElementById("table");
  table.innerHTML = "";

  let row = document.createElement("tr");
  
  if (attendanceLocalstorage.length != 0) {
    for (let s in arr) {
      let header = document.createElement("th");
      header.innerText = arr[s].toUpperCase();
      row.appendChild(header);
    }
  } else {
    let ifEmpty = document.createElement("td");
    ifEmpty.innerText = `There are no users `;
    row.appendChild(ifEmpty);
  }
  table.appendChild(row);

  for (let i = 0; i < localStorageParse.length; i++) {
    for (let j = 0; j < attendanceLocalstorage.length; j++) {
      if (localStorageParse[i].username == attendanceLocalstorage[j].username) {
        let drow = document.createElement("tr");

        let fname = document.createElement("td");
        fname.innerText = localStorageParse[i].FirstName;
        drow.appendChild(fname);

        let laname = document.createElement("td");
        laname.innerText = localStorageParse[i].LastName;
        drow.appendChild(laname);

        let date = document.createElement("td");
        let Time = document.createElement("td");
        date.innerText = attendanceLocalstorage[j].Date;
        drow.appendChild(date);
        Time.innerText = attendanceLocalstorage[j].Time;
        drow.appendChild(Time);

        let late = document.createElement("td");
        if (attendanceLocalstorage[j].LateAttend == false) {
          late.innerText = "-";
        } else {
          late.innerText = "Late";
        }
        drow.appendChild(late);

        for (let d in departureLocalstorage) {
          if (
            departureLocalstorage[d].username ==
              attendanceLocalstorage[j].username &&
            departureLocalstorage[d].Date == attendanceLocalstorage[j].Date
          ) {
            let Timed = document.createElement("td");
            Timed.innerText = departureLocalstorage[d].Time;
            drow.appendChild(Timed);

            let early = document.createElement("td");
            if (departureLocalstorage[d].EarlyDeparture === false) {
              early.innerText = "-";
            } else {
              early.innerText = "Leaved Early";
            }
            drow.appendChild(early);
          }
        }
        table.appendChild(drow);
      }
    }
  }
} // end of fullReport
