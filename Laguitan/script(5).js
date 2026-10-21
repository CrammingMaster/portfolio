const button1 = document.getElementById("loadbtn");
const state = document.getElementById("state");
const status1 = document.getElementById("status");
const result = document.getElementById("result");

button1.addEventListener("click", function() {
    // Show loading states
    state.innerHTML = "Fetching...";
    status1.innerHTML = "Status: Waiting...";
    result.innerHTML = "Loading...";

    let ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = function() {
        
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
            
            // Request is finished
            state.innerHTML = "Finished";
            status1.innerHTML = "Status: 200 OK";

            // Parse the data
            let data = JSON.parse(ajaxRequest.responseText);
            
            // Display ONLY the clean data, no ID stuff, no brackets
            result.innerHTML = `
                <div style="text-align: center; padding: 10px;">
                    <h3 style="color: #38a169; margin-bottom: 15px;">✅ Data Completed!</h3>
                </div>
            `;

        } else if (ajaxRequest.readyState == 4 && ajaxRequest.status != 200) {
            // Error handling
            state.innerHTML = "Error";
            status1.innerHTML = "Status: " + ajaxRequest.status;
            result.innerHTML = "<p style='color: red;'>Failed to load data.</p>";
        }
    };

    // Fetch a random user (changed to /users/3 so it's different from before)
    ajaxRequest.open("GET", "https://jsonplaceholder.typicode.com/users/3", true);
    ajaxRequest.send();
});