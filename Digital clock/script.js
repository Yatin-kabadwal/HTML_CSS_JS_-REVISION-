function updateClock() {
  // Get current time
  let now = new Date();
  
  // Extract hours, minutes, seconds
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add leading zeros if needed (e.g., 08 instead of 8)
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Format time as HH:MM:SS
  let time = `${hours}:${minutes}:${seconds}`;

  // Display in the HTML div with id="clock"
  document.getElementById("clock").innerText = time;
}

// Update every second
setInterval(updateClock, 1000);

// Show clock immediately on page load
updateClock();


var a = 10;
if(a == "10"){
  console.log("they are equal ")
}
 
if (a === "10"){
console.log("they are same");
}
else{
  console.log("The type is totally different")
}

