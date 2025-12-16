const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);


  if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
    return res.send("<h2>Invalid input. Please enter positive numbers.</h2><a href='/'>Go back</a>");
  }


  const bmi = weight / (height * height);
  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "blue";
  } else if (bmi < 24.9) {
    category = "Normal weight";
    color = "green";
  } else if (bmi < 29.9) {
    category = "Overweight";
    color = "orange";
  } else {
    category = "Obese";
    color = "red";
  }

  res.send(`
    <div style="text-align:center; margin-top:90px;">
      <h1>Your BMI Result</h1>
      <h2 style="color:${color};">BMI: ${bmi.toFixed(2)} (${category})</h2>
      <a href="/">Calculate Again</a>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
