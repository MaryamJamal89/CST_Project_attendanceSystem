export function allEmployees() {
  //get data from local storages
  let localStorageParse = JSON.parse(localStorage.getItem("user"));
  
  let table = document.getElementById("table");
  table.innerHTML = "";

  let row = document.createElement("tr");
  
  if (localStorageParse.length != 0) {
    //create table headers
    for (let s in localStorageParse[0]) {
      if (s != "username" && s != "password") {
        let header = document.createElement("th");
        header.innerText = s.toUpperCase();
        row.appendChild(header);
      }
    }
  } else {
    let ifEmpty = document.createElement("td");
    ifEmpty.innerText = `There are no users `;
    row.appendChild(ifEmpty);
  }
  table.appendChild(row);

  for (let i = 0; i < localStorageParse.length; i++) {
    let row = document.createElement("tr");
    //data in array
    for (let s in localStorageParse[i]) {
      if (s != "username" && s != "password") {
        let data = document.createElement("td");
        data.innerText = localStorageParse[i][s];
        row.appendChild(data);
      }
    }
    // append created tr with table
    table.appendChild(row);
  }
} //end of allEmployees
