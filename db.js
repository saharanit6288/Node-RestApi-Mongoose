const mongoose = require('mongoose');

mongoose.connect(
	'mongodb://RanitSahaMongoUser:'+process.env.Mongo_Atlas_Pwd+'@cluster0-shard-00-00-gltdp.mongodb.net:27017,cluster0-shard-00-01-gltdp.mongodb.net:27017,cluster0-shard-00-02-gltdp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true })
.then(() => {
    console.log("Connected to Database");
})
.catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;