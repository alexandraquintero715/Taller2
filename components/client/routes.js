const express = require('express')
const router = express.Router()
const { createClient } = require('./actions')

// GET by ID
router.get('/:id', (req, res) => {
  res.send({})
})

// POST Create a Client
router.post('/', createClient)

// PUT Update a Client's info
router.put('/:_id', (req, res) => {
  res.send({})
})

// DELETE by ID
router.delete('/:_id', (req, res) => {
  res.send('Cliente deleted successfully!')
})

module.exports = router
