async function loadTournamentData() {
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLGA5It74p58j1Ws1bC5SIxrmVKdgLfW7SU5RmBV7ehPe81xFlFQepGcfTJtYHAHDk-re3C9HnVkIj/pub?gid=0&single=true&output=csv';
    const response = await fetch(sheetURL);
    const data = await response.text();
    const rows = data.split("\n").map(r => r.split(","));

    let tableBody = document.querySelector("#tournament-table tbody");
    tableBody.innerHTML = "";

    for (let i = 1; i < rows.length; i++) {
        if(rows[i].length < 6) continue;
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${rows[i][0]}</td>
            <td>${rows[i][1]}</td>
            <td>${rows[i][2]}</td>
            <td>${rows[i][3]}</td>
            <td>${rows[i][4]}</td>
            <td><a href="${rows[i][5]}" target="_blank" style="color: #4fc3f7;">Join</a></td>
        `;
        tableBody.appendChild(tr);
    }
}

function copyUPI() {
    const upi = document.getElementById("upi-id").innerText;
    navigator.clipboard.writeText(upi).then(() => {
        alert("UPI ID Copied: " + upi);
    });
}

function payPhonePe() {
    const upi = document.getElementById("upi-id").innerText;
    const link = `upi://pay?pa=${upi}&pn=Shivam%20Rajpoot&am=0&cu=INR`;
    window.location.href = link;
}

function payPaytm() {
    const upi = document.getElementById("upi-id").innerText;
    const link = `paytmmp://pay?pa=${upi}&pn=Shivam%20Rajpoot&am=0&cu=INR`;
    window.location.href = link;
}

function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    fetch(form.action, {
        method: "POST",
        body: new FormData(form)
    }).then(() => {
        const msg = document.getElementById("thankyou-message");
        msg.classList.add("show");

        setTimeout(() => {
            msg.classList.remove("show");
            msg.style.display = "none";
        }, 5000);

        document.querySelector(".payment-section").scrollIntoView({ behavior: 'smooth' });
    }).catch(() => {
        alert("❌ Error! Please try again.");
    });
}

function toggleRules() {
    const rulesBox = document.getElementById("rules-box");
    rulesBox.style.display = (rulesBox.style.display === "none") ? "block" : "none";
}

loadTournamentData();
setInterval(loadTournamentData, 5000);