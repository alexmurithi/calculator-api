const mongoose = require('mongoose')

const { Schema, model } = mongoose

const calculationShema = new Schema(
  {
    operand1: Number,
    operand2: Number,
    operator: String,
    result: Number,
  },
  { timestamps: true },
)

const calculation = model('Calculation', calculationShema)

module.exports = calculation
