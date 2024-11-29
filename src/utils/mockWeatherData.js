const generateRandomWeatherForCity = (city) => {
    const descriptions = ["clear sky", "few clouds", "scattered clouds", "rain", "snow", "mist"];
    const temperatures = [15, 20, 25, 30, 35, 40, 10, 5];
  
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const temp = temperatures[Math.floor(Math.random() * temperatures.length)];
  
    return {
      name: city,
      weather: [
        {
          description: description,
        },
      ],
      main: {
        temp: temp,
      },
    };
  };
  
  export default generateRandomWeatherForCity;
  