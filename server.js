const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const apiKey = "73d3f95cbc85450eb81be5cf2cb36710";

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.render('index', {weather: null, error: null});
});

app.post('/', function(req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

	request(url, function(err, response, body) {
		if (err) {
			res.render('index', {weather: null, error: 'Error while accessing weather api'});
		}
		else
		{
			let weather = JSON.parse(body);
			if (weather.main == undefined)
				res.render('index', {weather: null, error: 'Weather not defined for given city'});
			else
			{
				let weatherText = `It's ${weather.main.temp} degree in ${weather.name}`;
				res.render('index', {weather: weatherText, error: null});
			}	
		}
	})
})

app.listen(process.env.PORT || 5000, function() {
	console.log('Server is listening');
})