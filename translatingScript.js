// --- Tab Switching ---
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    const target = document.getElementById(button.dataset.tab);
    target.classList.add("active");
  });
});

// --- Streak Counter ---
const streakCount = document.getElementById("streak-count");
const plusBtn = document.getElementById("plus-btn");
const minusBtn = document.getElementById("minus-btn");

function getToday() {
  return new Date().toDateString();
}

let streak = parseInt(localStorage.getItem("streak")) || 1114;
let lastLogin = localStorage.getItem("lastLogin") || "";

// Auto +1 per day
if (lastLogin !== getToday()) {
  streak++;
  localStorage.setItem("lastLogin", getToday());
  localStorage.setItem("streak", streak);
}

// Update display
function updateStreakDisplay() {
  streakCount.textContent = `Streak: ${streak} days`;
  streakCount.classList.add("streak-pulse");
  setTimeout(() => streakCount.classList.remove("streak-pulse"), 400);
}

updateStreakDisplay();

// Plus button (+1 day)
plusBtn.addEventListener("click", () => {
  streak++;
  localStorage.setItem("streak", streak);
  updateStreakDisplay();
});

// Minus button (-1 day)
minusBtn.addEventListener("click", () => {
  if (streak > 0) {
    streak--;
    localStorage.setItem("streak", streak);
    updateStreakDisplay();
  }
});
