import { monthlyReport } from './tabsFunctions/monthlyReport.js'
import { dailyReport } from './tabsFunctions/dailyReport.js'

window.addEventListener("load", function () {
    //assign click listener 
    document.getElementById('Daily').addEventListener('click', dailyReport);
    document.getElementById('Monthly').addEventListener('click', monthlyReport);
    //get employee name from the cookie
    let labelEmpName = document.getElementById('employeeName')
    labelEmpName.innerText = `Hello, ${getCookie('Name')}`;
});//end of load EventListener

//to parse cookie
export function getCookie(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
