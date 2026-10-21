console.log(document);

const Indicator = document.getElementById("name3");
const Display = document.getElementById("name");
// FIXED: Changed "Img1" to "Img6" to match the HTML
const Image1 = document.getElementById("Img6"); 
const Button1 = document.getElementById("btn1");
const Button2 = document.getElementById("btn2");
const Button3 = document.getElementById("btn3");
const Input = document.getElementById("input");

// Image Hover Events
Image1.addEventListener("mouseover", function () {
    Indicator.innerHTML = "Your Mouse has Entered the Image";
    Image1.style.transform = "scale(1.2)";
});

Image1.addEventListener("mouseout", function () {
    Indicator.innerHTML = "Your Mouse is Not Entered the image";
    Image1.style.transform = "scale(1)"; // Returns to normal size
});

// Button Click Events
Button1.addEventListener("click", function () {
    Indicator.innerHTML = "Single Clicked!!";
});

Button2.addEventListener("dblclick", function () {
    Indicator.innerHTML = "Double Clicked!!";
});

// Button 3 (Press and Hold)
Button3.addEventListener("mousedown", function () {
    Indicator.innerHTML = "Button 3 is being held down!";
});

Button3.addEventListener("mouseup", function () {
    Indicator.innerHTML = "Button 3 released!";
});

// Input Event (Reacts while typing)
Input.addEventListener("input", function () {
    Indicator.innerHTML = "You typed: " + Input.value;
});