var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/istto');

// User
var UserSchema = new Schema({
	name: String,
	username: String,
	email: String,
	password: String,
	role: String,
	places: [{type: Schema.ObjectId, ref: 'ChefPlace'}]
});
var User = mongoose.model('User', UserSchema);

// Place
var ChefPlaceSchema = new Schema({
	name: String,
	description: String,
	moreDescription: String,
	logo: String,
	menus: [{type: Schema.ObjectId, ref: 'ChefMenu'}],
	user: { type:Schema.ObjectId, ref:"User", childPath:"places" }
});
var ChefPlace = mongoose.model('ChefPlace', ChefPlaceSchema);

// Menu
var ChefMenuSchema = new Schema({
	name: String,
	description: String,
	image: String,
	price: String,
	place: { type:Schema.ObjectId, ref:"ChefPlace", childPath:"menus" }
});
var ChefMenu = mongoose.model('ChefMenu', ChefMenuSchema);

module.exports.ChefMenu = ChefMenu;
module.exports.ChefPlace = ChefPlace;
module.exports.User = User;