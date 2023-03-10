const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  stocks: [
    {ticker: {
      type: String,
      required: true,
      unique: false,
    },
    date: {
      type: String,
      required: true,
      unique: false,
    },
    open: {
      type: String,
      required: true,
      unique: false,
    },
    high: {
      type: String,
      required: true,
      unique: false,
    },
    low: {
      type: String,
      required: true,
      unique: false,
    },
    close: {
      type: String,
      required: true,
      unique: false,
    },
  }
  ],
  
},{
  toJSON: {
    virtuals: true,
  }},
);

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema)

module.exports = User;