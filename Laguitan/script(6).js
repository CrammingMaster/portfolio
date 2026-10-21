/* =========================================================
   Student Registration + Dark Mode
   ========================================================= */
$(function () {
  "use strict";

  const form        = document.getElementById("studentForm");
  const studentList = document.getElementById("studentList");
  const messageEl   = document.getElementById("message");

  /* ---------- THEME HANDLING (moved OUT of the submit handler) ---------- */
  function applyTheme(theme) {
    $("body").toggleClass("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }

  $("#dark").on("click", function () {
    applyTheme("dark");
  });

  $("#light").on("click", function () {
    applyTheme("light");
  });

  // Remember the user's last choice
  applyTheme(localStorage.getItem("theme") || "light");

  /* ---------- MESSAGE HELPER (with re-triggerable animation) ---------- */
  function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.classList.remove("success", "error", "show");

    // Force a reflow so the animation can restart even for identical messages
    void messageEl.offsetWidth;

    messageEl.classList.add(type, "show");
  }

  /* ---------- FORM SUBMIT ---------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const number = document.getElementById("studentNumber").value.trim();
    const first  = document.getElementById("firstName").value.trim();
    const last   = document.getElementById("lastName").value.trim();
    const course = document.getElementById("course").value;

    // Prevent duplicate student numbers
    const duplicate = Array.from(studentList.rows).some(function (row) {
      return row.cells[0].textContent.trim() === number;
    });

    if (duplicate) {
      showMessage("⚠️ Student number " + number + " is already registered.", "error");
      return;
    }

    // Build the new row
    const row = document.createElement("tr");
    row.classList.add("new-row");

    [number, first, last, course].forEach(function (value) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    studentList.appendChild(row);

    // Clean up the animation class once it finishes
    setTimeout(function () {
      row.classList.remove("new-row");
    }, 600);

    form.reset();
    document.getElementById("firstName").focus();

    showMessage("✅ Student \"" + first + " " + last + "\" added successfully!", "success");
  });
});