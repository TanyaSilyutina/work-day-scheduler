let savedNotes = {};

$(function () {
    init();
    // When user clicks the save button, their input is saved to local storage
    $('.saveBtn').click(function(e) {
        console.log($(this));
        // Identify row by the hour
        let hourRow = $(this).parent().attr('id').slice(5);
        console.log(hourRow);
        // Identify the user text input row
        let userTextInput = $(this).siblings('textarea').val();
        console.log(userTextInput);
        // Use hour as key to the user's input
        savedNotes[hourRow] = userTextInput;
        console.log(savedNotes);
        // Save user's text input to local storage
        localStorage.setItem("notes", JSON.stringify(savedNotes));
    });
});

function init() {
    // Get user text-input from the local storage
    let storedString = localStorage.getItem("notes");
    console.log(storedString);
    // Convert user input from string to object
    savedNotes = JSON.parse(storedString);
    // Set 'savedNotes' object to an empty object if it is null
    if(savedNotes == null){
        console.log("nothing in object");
        savedNotes = {};
    }
    console.log(savedNotes);
    // Display the time on the page's header
    $('#currentDay').text(dayjs().format("dddd, MMMM D, YYYY h:mm A"));
    // Create time blocks that use 24-hour time display
    for (let hour = 9; hour <= 17; hour++) {
        // Clone the time block template and set it to a var
        let el = $('#hour-template').clone();
        // Change the id attribute on the newly cloned time blocks
        // The id attribute reflects the time the row belongs to
        el.attr('id', 'hour-' + hour);
        // Add ':00' to display the 24:00 hour format
        el.children('.hour').text( hour + ":00");
        // Set current time var to let time blocks reflect the past, present, or future time
        let currentTime = parseInt(dayjs().format("HH"));
        // Compare the time block's time to current time and set classes accordingly
        if (hour < currentTime) {
            el.addClass('past');
        } else if (hour === currentTime) {
            el.addClass('present');
        } else {
            el.addClass('future');
        }
        // Remove the hidden attribute (that was hiding the initial template)
        el.removeAttr('hidden');
        // Get the value saved in storage
        el.children("textarea").val(savedNotes[hour]);
        // Add 'el' time blocks to the #schedule div
        $('#schedule').append(el);
    }
}