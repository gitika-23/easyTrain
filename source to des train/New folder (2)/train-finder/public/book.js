document.addEventListener("DOMContentLoaded", function() {
    const bookingForm = document.getElementById('bookingForm');
    const confirmationDiv = document.getElementById('confirmation');
    const ticketInfo = document.getElementById('ticketInfo');
  
    // Example of train data
    const trainData = [
      { "trainName": "Rajdhani Express", "from": "Delhi", "to": "Kanpur" },
      { "trainName": "Shatabdi Express", "from": "Delhi", "to": "Mathura" },
      { "trainName": "Garib Rath Express", "from": "Mathura", "to": "Kanpur" },
      { "trainName": "Duronto Express", "from": "Kanpur", "to": "Lucknow" },
      { "trainName": "Tejas Express", "from": "Delhi", "to": "Lucknow" }
    ];
  
    // Get train name from URL (you could pass this in dynamically from the previous page)
    const urlParams = new URLSearchParams(window.location.search);
    const trainName = urlParams.get('trainName') || 'Rajdhani Express'; // Default to 'Rajdhani Express' if not found
  
    // Set train name in the form (read-only)
    document.getElementById('trainName').value = trainName;
  
    bookingForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const passengerName = document.getElementById('passengerName').value;
      const seatType = document.getElementById('seatType').value;
      const berthType = document.getElementById('berth').value;
  
      // Show confirmation with ticket details
      ticketInfo.innerHTML = `
        <strong>Train Name:</strong> ${trainName} <br>
        <strong>Passenger Name:</strong> ${passengerName} <br>
        <strong>Seat Type:</strong> ${seatType} <br>
        <strong>Berth Type:</strong> ${berthType} <br>
        <strong>From:</strong> ${trainData.find(train => train.trainName === trainName).from} <br>
        <strong>To:</strong> ${trainData.find(train => train.trainName === trainName).to}
      `;
      
      // Hide the form and show the confirmation
      bookingForm.style.display = 'none';
      confirmationDiv.style.display = 'block';
    });
  });
  