const express = require("express");
const https = require("https");
// const fetch = require("node-fetch");
const app = express();
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    const city = req.body.city;
    // console.log(city)
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c2668ffce38642ac87dd9889496413d&units=metric`

    https.get(link, (response) => {
        console.log(response.weather);
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            res.send(`<h1> you are in ${weatherData.name} and the weather is ${weatherData.weather[0].description} </h1><br>
            <h2> the temperature is ${weatherData.main.temp} degrees celcius</h2> <br>
            <img src= ${icon} >`)
        })
    })
})



app.listen(5000, () => {
    console.log("Server is listening to port 5000")
});











// app.post("/", async (req, res) => {
//     const city = req.body.city;
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c2668ffce38642ac87dd9889496413d&units=metric`);
//     const weatherData = await response.json();
//     const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

//     res.send(`<h1> you are in ${weatherData.name} and the weather is ${weatherData.weather[0].description} </h1><br>
//                  <h2> the temperature is ${weatherData.main.temp} degrees celcius</h2> <br>
//                 <img src= ${icon} >`)
// })
