const mongoose = require('mongoose')

const { Schema, model } = mongoose

const calculationShema = new Schema(
  {
    operand1: Number,
    operand2: Number,
    operation: String,
    result: Number,
  },
  { timestamps: true },
)

const calculation = model('Calculation', calculationShema)

module.exports = calculation
