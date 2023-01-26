const {Schema, model} = require('mongoose')

const stockSchema = new Schema({
  ticker: {
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
},{
  toJSON: {
    virtuals: true,
  }},
);


const Stock = model('Stock', stockSchema)

module.exports = Stock;