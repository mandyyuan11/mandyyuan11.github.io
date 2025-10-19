// --- Tab Switching ---
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// --- Streak Counter ---
const streakCount = document.getElementById("streak-count");
const freezeBtn = document.getElementById("freeze-btn");

function getToday() {
  return new Date().toDateString();
}

let streak = parseInt(localStorage.getItem("streak")) || 1114;
let lastLogin = localStorage.getItem("lastLogin") || "";

if (lastLogin !== getToday()) {
  streak++;
  localStorage.setItem("lastLogin", getToday());
}

localStorage.setItem("streak", streak);
streakCount.textContent = `Streak: ${streak} days`;

freezeBtn.addEventListener("click", () => {
  if (streak > 0) {
    streak--;
    localStorage.setItem("streak", streak);
    streakCount.textContent = `Streak: ${streak} days`;
  }
});
