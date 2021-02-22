const Client = require('./model')

const createClient = (req, res) => {
  const newClient = new Client(req.body)
  newClient.save((error, clientSaved) => {
    if (error) {
      console.error('Error saving client ', error)
      res.status(500).send(error)
    } else {
      res.send(clientSaved)
    }
  })
}



module.exports = { createClient }
