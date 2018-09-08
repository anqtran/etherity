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
    type: String,                     //done
    required: true
  },
  short_description: {                //done
    type: String,
    required: true
  },

  description: {                      //done
    type: String,
    required: true
  },

  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organizations'
  },
  images: [
    {
      image: {
        data: Buffer,                 //done
        contentType: String
      }
    }
  ],
  base_price: {
    type: Number,
    required: true
  },
  bid: {
    buyer : {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    highestbid: {
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
