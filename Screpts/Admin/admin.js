import { allEmployees } from "./tabsFunctions/allEmployee.js";
import { fullReport } from "./tabsFunctions/fullReport.js";
import { lateReport } from "./tabsFunctions/lateReport.js";
import { earlyDepartureReport } from "./tabsFunctions/earlyDepartureReport.js";
import { pendingEmployees } from "./tabsFunctions/pendingEmployee.js";

window.addEventListener("load", function () {
  document
    .getElementById("allEmployeesBtn")
    .addEventListener("click", allEmployees);
  document
    .getElementById("fullReportBtn")
    .addEventListener("click", fullReport);
  document
    .getElementById("lateAttendanceReportBtn")
    .addEventListener("click", lateReport);
  document
    .getElementById("excuseReportBtn")
    .addEventListener("click", earlyDepartureReport);
  document
    .getElementById("pendingEmployeeBtn")
    .addEventListener("click", pendingEmployees);
}); //end of load

