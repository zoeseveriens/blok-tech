//Data in the database https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

//require mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserInterestsSchema = new Schema({
    Interests: {
        type: String,
        required: true
      }
});

//Creating a model from schema
const UserInterests = mongoose.model('UserInterests', UserInterestsSchema);

module.exports = UserInterests;

//Creating an instance of the model user interests
// moet in de server.js
const UserInterestsList = new UserInterests({Interests : 'Skydiving'}); //dit is wat je ziet op je account page


UserInterestsList.save(function (err){
  if (err) {
    throw err;
  } else {
    console.log('Interest is saved!');
  }
});