const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3100;

// Load train data from trains.json
const trainsFilePath = path.join(__dirname, "data", "trains.json");
let trainRoutes;

try {
  const data = fs.readFileSync(trainsFilePath, "utf-8");
  trainRoutes = JSON.parse(data);
} catch (error) {
  console.error("Error reading train data:", error);
  trainRoutes = []; // Fallback to empty array if file reading fails
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// API endpoint to fetch trains between two stations
app.get("/trains", (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "Please provide both 'from' and 'to' stations" });
  }

  const matchingTrains = trainRoutes.filter(
    (train) =>
      train.from.toLowerCase() === from.toLowerCase() &&
      train.to.toLowerCase() === to.toLowerCase()
  );

  if (matchingTrains.length === 0) {
    return res.status(404).json({ message: "No trains found for the given route" });
  }

  res.json({ trains: matchingTrains });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
