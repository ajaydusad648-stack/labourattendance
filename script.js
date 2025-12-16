let labours = JSON.parse(localStorage.getItem("labours")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  updateDashboard();
  loadAttendance();
}

document.getElementById("labourForm").addEventListener("submit", function(e){
  e.preventDefault();
  const labour = {
    id: labourId.value,
    name: name.value,
    age: age.value,
    mobile: mobile.value,
    workType: workType.value
  };
  labours.push(labour);
  localStorage.setItem("labours", JSON.stringify(labours));
  this.reset();
  alert("Labour Added");
  updateDashboard();
});

function loadAttendance() {
  const table = document.getElementById("attendanceTable");
  table.innerHTML = "";
  labours.forEach((labour, i) => {
    table.innerHTML += `
      <tr>
        <td>${labour.name}</td>
        <td>${labour.workType}</td>
        <td>
          <select id="status${i}">
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </td>
      </tr>
    `;
  });
}

function saveAttendance() {
  const date = attendanceDate.value;
  if (!date) return alert("Select date");
  attendance[date] = labours.map((labour, i) => ({
    name: labour.name,
    status: document.getElementById(`status${i}`).value
  }));
  localStorage.setItem("attendance", JSON.stringify(attendance));
  alert("Attendance Saved");
  updateDashboard();
}

function loadReport() {
  const date = reportDate.value;
  const table = document.getElementById("reportTable");
  table.innerHTML = "";
  if (!attendance[date]) return;
  attendance[date].forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r.name}</td>
        <td>${r.status}</td>
      </tr>
    `;
  });
}

function updateDashboard() {
  totalLabour.innerText = labours.length;
  const today = new Date().toISOString().split("T")[0];
  let present = 0;
  let absent = 0;
  if (attendance[today]) {
    attendance[today].forEach(r => {
      r.status === "Present" ? present++ : absent++;
    });
  }
  presentToday.innerText = present;
  absentToday.innerText = absent;
}

updateDashboard();
