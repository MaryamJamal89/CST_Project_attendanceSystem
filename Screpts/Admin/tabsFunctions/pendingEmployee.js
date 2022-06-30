//get data from local storages
let localStorageParse = JSON.parse(localStorage.getItem("user"));
let pendingLocalStorage = JSON.parse(localStorage.getItem("pending"));

export function pendingEmployees() {
  let table = document.getElementById("table");
  table.innerHTML = "";

  let row = document.createElement("tr");

  if (pendingLocalStorage.length != 0) {
    for (let s in pendingLocalStorage[0]) {
      if (s != "username" && s != "password") {
        let header = document.createElement("th");
        header.innerText = s.toUpperCase();
        row.appendChild(header);
      }
    }

    //add approved column
    let activateTh = document.createElement("th");
    activateTh.innerText = "Approve";
    row.appendChild(activateTh);
    //add delete column
    let deleteTh = document.createElement("th");
    deleteTh.innerText = "Delete";
    row.appendChild(deleteTh);
  } else {
    //if pending is empty
    let ifEmpty = document.createElement("td");
    ifEmpty.innerText = `There are no pending users `;
    row.appendChild(ifEmpty);
  }
  table.appendChild(row);

  //append data
  for (let i = 0; i < pendingLocalStorage.length; i++) {
    let arow = document.createElement("tr");
    for (let s in pendingLocalStorage[i]) {
      if (s != "username" && s != "password") {
        let adata = document.createElement("td");
        adata.innerText = pendingLocalStorage[i][s];
        adata.nodeValue = pendingLocalStorage[i][s];
        arow.appendChild(adata);
      }
    }
    //add approved icon and its addEventListener
    let approveTD = document.createElement("td");
    approveTD.innerHTML = `<i class="fa fa-check" style="font-size:20px; color:grey;">`;
    arow.appendChild(approveTD);
    approveTD.firstChild.addEventListener("click", approveEmp);
    //add delete icon and its addEventListener
    let denyTD = document.createElement("td");
    denyTD.innerHTML = `<i class="fa fa-trash" style="font-size:20px; color:grey;">`;
    arow.appendChild(denyTD);
    denyTD.firstChild.addEventListener("click", denyEmp);

    table.appendChild(arow);
  }
} //end of pendingEmployees

function approveEmp() {
  let targetedTR = this.parentNode.parentNode;
  let table = targetedTR.parentNode;
  let targetedMail = targetedTR.children[0].innerText;
  let targetedUserFname = targetedTR.children[2].innerText;
  let targetedUserLname = targetedTR.children[3].innerText;
  if (
    confirm(
      `Approving ${targetedUserFname} ${targetedUserLname}, Are you sure ?`
    )
  ) {
    //JsEmail API
    for (let i = 0; i < pendingLocalStorage.length; i++) {
      if (targetedMail === pendingLocalStorage[i].email) {
        let data = {
          service_id: "service_q47wiwo",
          template_id: "template_3jxhesh",
          user_id: "user_BJD3fjQNKA832RZisxjBH",
          template_params: pendingLocalStorage[i],
        };
        //TODO: confirm
        $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
          type: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
        })
          .done(function () {
            alert("Your mail has been sent!");
            //push to active employee localStorage
            localStorageParse.push(pendingLocalStorage[i]);
            localStorage.setItem("user", JSON.stringify(localStorageParse));
            //remove from pending localStorage
            pendingLocalStorage.splice(i, 1);
            localStorage.setItem(
              "pending",
              JSON.stringify(pendingLocalStorage)
            );
            //remove from table
            table.removeChild(targetedTR);
          })
          .fail(function (error) {
            alert(
              "Oops... Smth went wrong! Try again." + JSON.stringify(error)
            );
          });
      }
    }
  } else {
    alert(
      `${targetedUserFname} ${targetedUserLname} is Waiting for your approval `
    );
  }
} //end of approveEmp

function denyEmp() {
  let targetedTR = this.parentNode.parentNode;
  let table = targetedTR.parentNode;
  let targetedMail = targetedTR.children[0].innerText;
  let targetedUserFname = targetedTR.children[2].innerText;
  let targetedUserLname = targetedTR.children[3].innerText;
  if (
    confirm(
      `Denying ${targetedUserFname} ${targetedUserLname} request, Are you sure ?`
    )
  ) {
    for (let i = 0; i < pendingLocalStorage.length; i++) {
      if (targetedMail === pendingLocalStorage[i].email) {
        //what??
        localStorageParse.push(pendingLocalStorage[i]);
        localStorage.setItem("user", JSON.stringify(localStorageParse));
        //remove from pending localStorage
        pendingLocalStorage.splice(i, 1);
        localStorage.setItem("pending", JSON.stringify(pendingLocalStorage));
        //remove from table
        table.removeChild(targetedTR);
      }
    }
  } else {
    alert(
      `${targetedUserFname} ${targetedUserLname} is Waiting for your approval `
    );
  }
} //end of denyEmp
