const mongoose = require('mongoose')

const emailRegex = '/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/'

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: {
		type: String,
		trim: [true, 'Username required'],
		required: true,
		minlength: 5,
		maxlength: 20,
		lowercase: true,
		unique: true
	},
    email: {
		type: String,
		trim: true,
		required: [true, 'Email required'],
		maxlength: 50,
		lowercase: true,
		validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: 'Please enter a valid email'
        },
		unique: true
	},
    password: {
		type: String,
		required: true
	},
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ]
  })
)

module.exports = User