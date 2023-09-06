const Calculation = require('../models/calculation.model')

const addition = (a, b) => a + b

const subtraction = (a, b) => a - b

const multiplication = (a, b) => a * b

const division = (a, b) => a / b

const performCalculation = ({ operand1, operand2, operation }) => {
  let result

  switch (operation) {
    case '+':
      result = addition(operand1, operand2)
      break
    case '-':
      result = subtraction(operand1, operand2)
      break
    case '*':
      result = multiplication(operand1, operand2)
      break
    case '/':
      result = division(operand1, operand2)
      break
    default:
      throw new Error('Invalid Operation')
  }

  return Calculation.create({
    operand1,
    operand2,
    operation,
    result,
  })
    .then(item => item)
    .catch(err => {
      throw new Error(`Something went wrong: ${err.message}`)
    })
}

const calculationHistory = () =>
  Calculation.find()
    .then(history => history)
    .catch(err => err)

const calculationHistoryById = id =>
  new Promise((resolve, reject) => {
    Calculation.findById(id)
      .then(history => resolve(history))
      .catch(err => reject(err))
  })
module.exports = {
  performCalculation,
  calculationHistory,
  calculationHistoryById,
}
