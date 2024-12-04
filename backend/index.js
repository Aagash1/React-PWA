const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.get('/api/weather', (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.json("city not provided");
  }

  const descriptions = ['clear sky', 'rain', 'snow', 'cloudy'];
  const temperatures = [15, 20, 25, 30, 5];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  const temp = temperatures[Math.floor(Math.random() * temperatures.length)];
  res.json({
    name: city,
    weather: [{ description }],
    main: { temp },
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
