// add code in here to create an API with ExpressJS
const express = require('express');
const app = express();

// enable the static folder...
app.use(express.static('public'));


// enable the req.body object - to allow us to use HTML forms
// when doing post requests
// put this before you declare any routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import the dataset to be used here

const PORT = process.env.PORT || 4017;

// API routes to be added here

app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});

// import the dataset to be used here
const garments = require('./garments.json');

app.get('/api/garments', function(req, res){
	// note that this route just send JSON data to the browser
	// there is no template
	res.json({garments});
});

// console.log(garments)


app.get('/api/garments/gender/:gender/season/:season', function(req, res){

	const gender = req.params.gender;
	const season = req.params.season;
console.log(season);


	const filteredGarments = garments.filter(garment => {


        if (gender != 'All' && season != 'All') {
			return garment.gender === gender 
				&& garment.season === season;
		} else if(gender != 'All') { // if gender was supplied
			return garment.gender === gender
		} else if(season != 'All') { // if season was supplied
			return garment.season === season
		}
		return true;
        
	});

	res.json({ 
		garments : filteredGarments
	});
});

app.get('/api/garments/price/:price', function(req, res){
	const maxPrice = Number(req.params.price);
	const filteredGarments = garments.filter( garment => {
		// filter only if the maxPrice is bigger than maxPrice
		if (maxPrice > 0) {
			return garment.price <= maxPrice;
		}
		return true;
	});

	res.json({ 
		garments : filteredGarments
	});
});

//creating api
app.post('/api/garments', (req, res) => {

	// get the fields send in from req.body
	const {
		description,
		img,
		gender,
		season,
		price
	} = req.body;

	// add some validation to see if all the fields are there.
	// only 3 fields are made mandatory here
	// you can change that

	if (!description || !img || !price || !gender || !season) {
		res.json({
			status: 'error',
			message: 'Required data not supplied',
		});
	} else {

		// you can check for duplicates here using garments.find

        // garments.find({
		// 	description,
		// 	img,
		// 	gender,
		// 	season,
		// 	price
		// });
		
		// add a new entry into the garments list
		garments.push({
			description,
			img,
			gender,
			season,
			price
		});

		res.json({
			status: 'success',
			message: 'New garment added.',
		});
	}

});


