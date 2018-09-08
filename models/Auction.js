const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AuctionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String,
    required: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  avatar: {
    type: String
  },
  base_price: {
    type: Number,
    required: true
  },
  bid: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('auction', AuctionSchema);
