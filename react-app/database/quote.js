const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var quote = new Schema({
  quoteID: {
    type: String,
    unique: true
  },
  text: String,
  author: String,
  datePosted: Date,
  rating: Number,
  category: []
});

var quoteModel = mongoose.model("quotes", quote);

module.exports = {
  quoteModel,

  addQuote: function(data) {
    return new Promise(function(resolve, reject) {
      var quote_data = new quoteModel({
        quoteID: data.quoteID,
        text: data.text,
        author: data.author,
        datePosted: data.datePosted,
        rating: data.rating,
        category: data.category
      });
      quote_data.save(err => {
        if (err) {
          if (err.code == 11000) {
            reject("Quote already exists!");
          } else {
            resolve("New quote added!");
          }
        } else {
          resolve("New quote added!");
        }
      });
    });
  },

  fetchQuoteList: function(categoryName) {
    // console.log(categoryName);
    return new Promise(function(resolve, reject) {
      quoteModel
        .find({
          category: categoryName
        })
        .exec()
        .then(data => {
          if (data.length > 0) {
            resolve(data);
          } else {
            reject("No quotes found with category " + categoryName + "!");
          }
        });
    });
  },

  rateQuote: function(data) {},

  removeQuote: function(data) {}
};
