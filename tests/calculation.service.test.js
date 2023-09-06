/* eslint-disable no-undef */
const {
  performCalculation,
  calculationHistory,
  calculationHistoryById,
} = require('../src/services/calculation.service')
const Calculation = require('../src/models/calculation.model')

// Mock the Calculation.create method to avoid actual database calls
jest.mock('../src/models/calculation.model', () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
}))

describe('performCalculation', () => {
  afterEach(() => {
    jest.clearAllMocks() // Clear mocks between test cases
  })

  it('should perform addition correctly and return the result', async () => {
    const mockResult = {
      operand1: 2,
      operand2: 3,
      operator: '+',
      result: 5,
    }
    Calculation.create.mockResolvedValue(mockResult)

    const result = await performCalculation({
      operand1: 2,
      operand2: 3,
      operator: '+',
    })

    expect(result).toEqual(mockResult)

    // Verify that Calculation.create was called with the correct arguments
    expect(Calculation.create).toHaveBeenCalledWith(mockResult)
  })

  it('should perform subtraction correctly and return the result', async () => {
    const mockResult = {
      operand1: 5,
      operand2: 2,
      operator: '-',
      result: 3,
    }
    Calculation.create.mockResolvedValue(mockResult)

    const result = await performCalculation({
      operand1: 5,
      operand2: 2,
      operator: '-',
    })

    expect(result).toEqual(mockResult)

    // Verify that Calculation.create was called with the correct arguments
    expect(Calculation.create).toHaveBeenCalledWith(mockResult)
  })

  it('should perform multiplication correctly and return the result', async () => {
    const mockResult = {
      operand1: 4,
      operand2: 6,
      operator: '*',
      result: 24,
    }
    Calculation.create.mockResolvedValue(mockResult)

    const result = await performCalculation({
      operand1: 4,
      operand2: 6,
      operator: '*',
    })

    expect(result).toEqual(mockResult)

    // Verify that Calculation.create was called with the correct arguments
    expect(Calculation.create).toHaveBeenCalledWith(mockResult)
  })

  it('should perform division correctly and return the result', async () => {
    const mockResult = {
      operand1: 8,
      operand2: 4,
      operator: '/',
      result: 2,
    }
    Calculation.create.mockResolvedValue(mockResult)

    const result = await performCalculation({
      operand1: 8,
      operand2: 4,
      operator: '/',
    })

    expect(result).toEqual(mockResult)

    // Verify that Calculation.create was called with the correct arguments
    expect(Calculation.create).toHaveBeenCalledWith(mockResult)
  })

  it('should retrieve calculation history successfully', async () => {
    // Mock the return value of Calculation.find
    const mockHistory = [
      { operand1: 2, operand2: 3, operator: '+', result: 5 },
      { operand1: 4, operand2: 2, operator: '-', result: 2 },
    ]

    Calculation.find.mockResolvedValue(mockHistory)

    const history = await calculationHistory()

    expect(history).toEqual(mockHistory)

    expect(Calculation.find).toHaveBeenCalledWith()
  })

  it('should retrieve calculation history by ID successfully', async () => {
    // Mock the return value of Calculation.findById
    const mockHistoryItem = {
      _id: 'someId',
      operand1: 2,
      operand2: 3,
      operator: '+',
      result: 5,
    }

    Calculation.findById.mockResolvedValue(mockHistoryItem)

    const historyItem = await calculationHistoryById('someId')

    expect(historyItem).toEqual(mockHistoryItem)

    // Verify that Calculation.findById was called with the correct ID
    expect(Calculation.findById).toHaveBeenCalledWith('someId')
  })

  it('should throw an error for an invalid operator', async () => {
    // Ensure that Calculation.create is not called in this case
    Calculation.create.mockImplementation(() => {
      throw new Error('Invalid operator')
    })

    // Use async/await  to handle the expected error
    try {
      await performCalculation({ operand1: 2, operand2: 3, operator: '%' })
      // If no error is thrown, fail the test
      fail('Expected an error to be thrown')
    } catch (error) {
      // Verify that the error message matches 'Invalid operator'
      expect(error.message).toBe('Invalid operator')
      // Verify that Calculation.create was not called
      expect(Calculation.create).not.toHaveBeenCalled()
    }
  })
})
