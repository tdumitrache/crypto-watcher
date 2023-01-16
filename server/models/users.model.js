const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name!'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  transactions: {
    type: [
      {
        tokenPrice: {
          type: Number,
        },
        buyPrice: {
          type: Number,
        },
        assetId: {
          type: String,
        },
      },
    ],
  },
});

module.exports = mongoose.model('Users', userSchema);
