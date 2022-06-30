export function earlyDepartureReport() {
  //get data from local storages
  let localStorageParse = JSON.parse(localStorage.getItem("user"));
  let attendanceLocalStorage = JSON.parse(localStorage.getItem("attendance"));
  let departureLocalStorage = JSON.parse(localStorage.getItem("departure"));

  let arr = ["FirstName", "LastName", "Day", "DepartureTime", "EarlyDeparture"];

  let table = document.getElementById("table");
  table.innerHTML = "";

  let row = document.createElement("tr");

  if (departureLocalStorage.length != 0) {
    for (let s in arr) {
      let header = document.createElement("th");
      header.innerText = arr[s].toUpperCase();
      row.appendChild(header);
    }
  } else {
    let ifEmpty = document.createElement("td");
    ifEmpty.innerText = `There are no early departures`;
    row.appendChild(ifEmpty);
  }
  table.appendChild(row);

  for (let i = 0; i < localStorageParse.length; i++) {
    for (let j = 0; j < departureLocalStorage.length; j++) {
      if (
        localStorageParse[i].username == departureLocalStorage[j].username &&
        departureLocalStorage[j].EarlyDeparture == true
      ) {
        let drow = document.createElement("tr");

        let fname = document.createElement("td");
        fname.innerText = localStorageParse[i].FirstName;
        drow.appendChild(fname);

        let laname = document.createElement("td");
        laname.innerText = localStorageParse[i].FirstName;
        drow.appendChild(laname);

        let date = document.createElement("td");
        let Time = document.createElement("td");
        date.innerText = departureLocalStorage[j].Date;
        drow.appendChild(date);
        Time.innerText = departureLocalStorage[j].Time;
        drow.appendChild(Time);

        let late = document.createElement("td");
        if (attendanceLocalStorage[j].LateAttend == false) {
          late.innerText = "-";
        } else {
          late.innerText = "Late";
        }
        drow.appendChild(late);

        table.appendChild(drow);
      }
    }
  }
} // end of earlyDepartureReport
