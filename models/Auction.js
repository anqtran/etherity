const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);
// Create Schema
const AuctionSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  name: {
    type: String, //done
    required: true
  },

  shortDescription: {
    //done
    type: String,
    required: true
  },

  description: {
    //done
    type: String,
    required: true
  },

  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organizations',
    required: true
  },

  images: {
    type: String
  },
  basePrice: {
    type: Number,
    required: true
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  highestbid: {
    type: Number
  },
  dateLastBid: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  },
  available: {
    type: Boolean
  }
});

module.exports = Post = mongoose.model('auction', AuctionSchema);
