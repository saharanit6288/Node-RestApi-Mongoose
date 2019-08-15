const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
	process.env.MONGODB_URL,
    { useNewUrlParser: true })
.then(() => {
    console.log("Connected to Database");
})
.catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;