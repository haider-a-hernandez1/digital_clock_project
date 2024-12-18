let is24Hour = true; // Default 24-hour format
let alarmTime = null; // Alarm placeholder

// Start Clock
function startTime() {
    const today = new Date();
    const tz = document.getElementById('timezone').value;

    // Time formatting options
    let options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour, // 12-hour or 24-hour format toggle
        timeZone: tz === 'local' ? undefined : tz, // Local time if selected
    };

    // Format time and date
    let formatter = new Intl.DateTimeFormat([], options);
    let formattedTime = formatter.format(today);

    let dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        timeZone: tz === 'local' ? undefined : tz 
    };
    let formattedDate = new Intl.DateTimeFormat([], dateOptions).format(today);

    // Update the clock and date in the HTML
    document.getElementById('txt').innerHTML = formattedTime;
    document.getElementById('date').innerHTML = formattedDate;

    // Check Alarm
    checkAlarm(today.getHours(), today.getMinutes());

    setTimeout(startTime, 500); // Update clock every 0.5 seconds
}

// Toggle 12/24 Hour Format
document.getElementById('toggleFormat').addEventListener('click', () => {
    is24Hour = !is24Hour; // Toggle the flag
    startTime(); // Refresh the clock display
});

// Toggle Theme
document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('light-theme'); // Toggle theme class
});

// Set Alarm Button
document.getElementById('setAlarm').addEventListener('click', () => {
    alarmTime = document.getElementById('alarmTime').value;
    if (alarmTime) {
        alert(`Alarm set for: ${alarmTime}`);
    }
});

// Check Alarm
function checkAlarm(currentHour, currentMinute) {
    if (alarmTime) {
        let [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);
        if (currentHour === alarmHour && currentMinute === alarmMinute) {
            playAlarm();
            alarmTime = null; // Reset alarm after triggering
        }
    }
}

// Play Alarm Sound
function playAlarm() {
    const alarmSound = new Audio("{{ url_for('static', filename='alarm.mp3') }}");
    alarmSound.play();
    alert("Time's up!");
}

// Start the clock when the page loads
startTime();
