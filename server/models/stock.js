const {Schema, model} = require('mongoose')

const stockSchema = new Schema({
  ticker: {
    type: String,
    required: false,
    unique: true,
  }
},{
  toJSON: {
    virtuals: true,
  }},
);


const Stock = model('Stock', stockSchema)

module.exports = Stock;