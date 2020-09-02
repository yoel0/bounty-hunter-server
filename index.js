const express = require('express');
const app = express();
const cors = require('cors');

// <<<< FORM DATA MIDDLEWARE >>>>
// ALLOWS FORM DATA TO BE PROCESSED IN TO REQ.BODY
app.use(express.urlencoded({ extended: false }));
// tells express to recognize req.body as a json object
app.use(express.json());
app.use(cors());

// include the bounties controller
app.use('/bounties', require('./controllers/bounties'));

app.get('/', (req, res) => {
	res.send('You have touched the home route of the bounty server');
});

app.listen(8000, () => {
	console.log('Listening to the beats of SOUL8000');
});
