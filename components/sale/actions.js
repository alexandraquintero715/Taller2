const Sale = require('./model')

const createSale = (req, res) => {  
  const newSale = new Sale(req.body)
  newSale.save((error, saleSaved) => {
    if (error) {
      res.status(422).send(error)
    } else {
      res.status(201).send(saleSaved)
    }
  })
}

const getSales = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.*${req.query.name}.*`, 'i') }
  }

  Sale.find(Object.assign({}, query, { clientId: req.params.idCliente }), (error, sales) => {
    if (error) {
      res.status(500).send(error)
    } else {
      res.send(sales)
    }
  })
}

const getSale = (req, res) => {
  Sale.findOne(
      { 
          _id: req.params.id,
          clientId: req.params.idCliente
      }, (error, sale) => {
    sale.populate('idCliente').populate('details.idBook').execPopulate((error, saleWithAllInfo) => {
      if (error) {
        res.status(500).send(error)
      } else if (saleWithAllInfo) {
        res.send(saleWithAllInfo)
      } else {
        res.status(404).send({})
      }
    })
  })
}

const updateSale = (req, res) => {  
  Sale.updateOne({ _id: req.params.id, clientId: req.params.idCliente }, req.body, (error, result) => {
    if (error) {
      res.status(422).send(error)
    } else {
      res.send(result)
    }
  })
}

const deleteSale = (req, res) => {
  Sale.findOneAndDelete(
      {
           _id: req.params.id,
            clientId: req.params.idCliente }, (error, result) => {
    if (error) {
      res.status(500).send(error)
    } else {
      res.status(204).send('Venta eliminada')
    }
  })
}

module.exports = { createSale, deleteSale, getSale, getSales, updateSale }