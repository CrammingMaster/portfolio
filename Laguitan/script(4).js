$(document).ready(function() {
    
    // 1. Change Title (Click)
    $("#change").click(function() {
        $("#main-title").text("Title Changed!");
    });

    // 2. Hide & Show Profile and Table (Click)
    $("#hide").click(function() {
        // Hide the card and table
        $("#profile-card, #student-table").hide();
        // Show the Show button
        $("#show-container").show();
        $("#status-message").text("Profile & Table hidden.");
    });

    $("#show").click(function() {
        // Show the card and table
        $("#profile-card, #student-table").show();
        // Hide the Show button again
        $("#show-container").hide();
        $("#status-message").text("Profile & Table shown.");
    });

    // 3. Input Focus & Blur (Focus & Blur events)
    $("#name-input").focus(function() {
        $(this).css("background-color", "#ebf8ff");
        $("#status-message").text("Input is focused...");
    });

    $("#name-input").blur(function() {
        $(this).css("background-color", "#ffffff");
        $("#status-message").text("Input blurred. Progress Saved.");
    });

    // 4. Select Change (Change event)
    $("#course-select").change(function() {
        let selectedCourse = $(this).val();
        $("#course-display").html("<strong>Course:</strong> " + selectedCourse);
        $("#status-message").text("Course updated to " + selectedCourse);
    });

    // 5. Table Row Interactions (Mouse enter, leave, click, dblclick)
    $("#student-table tbody tr").mouseenter(function() {
        $(this).css("background-color", "#e2e8f0");
    }).mouseleave(function() {
        if (!$(this).hasClass("colored")) {
            $(this).css("background-color", "");
        }
    });

    $("#student-table tbody tr").click(function() {
        let name = $(this).find("td").eq(1).text();
        $("#status-message").text("Selected student: " + name);
    });

    $("#student-table tbody tr").dblclick(function() {
        let name = $(this).find("td").eq(1).text();
        alert("Double-clicked on: " + name);
    });

    // 6. Color Odd and Even Rows (Click)
    $("#odd").click(function() {
        $("#student-table tbody tr").removeClass("colored").css("background-color", "");
        $("#student-table tbody tr:odd").addClass("colored").css("background-color", "#bee3f8"); 
    });

    $("#even").click(function() {
        $("#student-table tbody tr").removeClass("colored").css("background-color", "");
        $("#student-table tbody tr:even").addClass("colored").css("background-color", "#fefcbf"); 
    });

    // 7. Hide Table Only (Click)
    $("#hide-table-btn").click(function() {
        $("#student-table").hide();
        $("#status-message").text("Table hidden.");
    });

    // 8. Show Table Only (Click)
    $("#show-table-btn").click(function() {
        $("#student-table").show();
        $("#status-message").text("Table shown.");
    });

});