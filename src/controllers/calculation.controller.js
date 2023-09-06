const express = require('express')

const router = express.Router()

const calculationService = require('../services/calculation.service')

router.post('/', (req, res) =>
  calculationService
    .performCalculation(req.body)
    .then(item => res.status(201).json(item))
    .catch(err =>
      res.status(500).json({
        error: 'Operation not successfull!',
        description: `Error: ${err.message}`,
      }),
    ),
)

router.get('/', (req, res) =>
  calculationService
    .calculationHistory()
    .then(history => res.status(200).json(history)),
)

router.get('/:id', (req, res) =>
  calculationService
    .calculationHistoryById(req.params.id)
    .then(history => res.status(200).json(history))
    .catch(err =>
      res
        .status(404)
        .json({ error: 'History not found', description: err.message }),
    ),
)

module.exports = router
