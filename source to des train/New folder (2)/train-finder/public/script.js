const form = document.getElementById("trainForm");
const trainList = document.getElementById("trainList");
const errorDiv = document.getElementById("error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  trainList.innerHTML = ""; // Clear previous results
  errorDiv.textContent = ""; // Clear previous errors

  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();

  if (!from || !to) {
    errorDiv.textContent = "Both fields are required.";
    return;
  }

  try {
    const response = await fetch(`/trains?from=${from}&to=${to}`);
    if (response.ok) {
      const data = await response.json();
      if (data.trains && data.trains.length > 0) {
        data.trains.forEach((train) => {
          const li = document.createElement("li");
          li.textContent = train.trainName;

          // Create "Book" button
          const bookButton = document.createElement("button");
          bookButton.textContent = "Book";
          bookButton.className = "book-button";
          bookButton.addEventListener("click", () => {
            // Redirect to booking page with train name in query params
            window.location.href = `booking.html?trainName=${encodeURIComponent(train.trainName)}`;
          });

          li.appendChild(bookButton); // Append button to list item
          trainList.appendChild(li);
        });
      } else {
        errorDiv.textContent = "No trains found for the given route.";
      }
    } else {
      const errorData = await response.json();
      errorDiv.textContent = errorData.message || "An error occurred.";
    }
  } catch (error) {
    errorDiv.textContent = "Failed to fetch data. Please try again.";
  }
});
