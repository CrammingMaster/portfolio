const Message = document.getElementById("message");
const Button1 = document.getElementById("Btn1");
const profile = document.getElementById("profile");
const grades = document.getElementById("grades");
const schedule = document.getElementById("schedule");

Button1.addEventListener("click", function () {
    Message.innerHTML = "Loading Dashboard...";
    profile.innerHTML = "Profile: Waiting...";
    grades.innerHTML = "Grades: Waiting...";
    schedule.innerHTML = "Schedule: Waiting...";

    const profilePromise = new Promise(function(resolve) {
        setTimeout(function() {
            profile.innerHTML = "Profile: Loaded";
            resolve();
        }, 1000);
    });

    const gradesPromise = new Promise(function(resolve) {
        setTimeout(function() {
            grades.innerHTML = "Grades: Loaded";
            resolve();
        }, 2000);
    });

    const schedulePromise = new Promise(function(resolve) {
        setTimeout(function() {
            schedule.innerHTML = "Schedule: Loaded";
            resolve();
        }, 3000);
    });

    Promise.all([profilePromise, gradesPromise, schedulePromise])
    .then(function() {
        Message.innerHTML = "Dashboard Ready!";
    });
});