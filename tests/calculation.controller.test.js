/* eslint-disable no-undef */
const express = require('express')

const supertest = require('supertest')

const app = express()
const router = require('../src/controllers/calculation.controller') // Replace with the actual path to your controller
const calculationService = require('../src/services/calculation.service')

// Mock the calculationService methods
jest.mock('../src/services/calculation.service', () => ({
  performCalculation: jest.fn(),
  calculationHistory: jest.fn(),
  calculationHistoryById: jest.fn(),
}))

app.use(express.json())
app.use('/', router)

const request = supertest(app)

describe('Calculation Controller', () => {
  afterEach(() => {
    jest.clearAllMocks() // Clear mocks between test cases
  })

  it('should handle POST /', async () => {
    const requestBody = {
      operand1: 2,
      operand2: 3,
      operation: '+',
    }

    const mockResult = {
      operand1: 2,
      operand2: 3,
      operation: '+',
      result: 5,
    }

    calculationService.performCalculation.mockResolvedValue(mockResult)

    const response = await request.post('/').send(requestBody)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(mockResult)
    expect(calculationService.performCalculation).toHaveBeenCalledWith(
      requestBody,
    )
  })

  it('should handle GET /', async () => {
    const mockHistory = [
      { operand1: 2, operand2: 3, operation: '+', result: 5 },
      { operand1: 4, operand2: 2, operation: '-', result: 2 },
    ]

    calculationService.calculationHistory.mockResolvedValue(mockHistory)

    const response = await request.get('/')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockHistory)
    expect(calculationService.calculationHistory).toHaveBeenCalled()
  })

  it('should handle GET /:id', async () => {
    const mockHistoryItem = {
      _id: 'someId',
      operand1: 2,
      operand2: 3,
      operation: '+',
      result: 5,
    }

    calculationService.calculationHistoryById.mockResolvedValue(mockHistoryItem)

    const response = await request.get('/someId')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockHistoryItem)
    expect(calculationService.calculationHistoryById).toHaveBeenCalledWith(
      'someId',
    )
  })

  it('should handle GET /:id with a not found error', async () => {
    const errorMessage = 'History not found'

    calculationService.calculationHistoryById.mockRejectedValue(
      new Error(errorMessage),
    )

    const response = await request.get('/invalidId')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      error: 'History not found',
      description: errorMessage,
    })
    expect(calculationService.calculationHistoryById).toHaveBeenCalledWith(
      'invalidId',
    )
  })
})
