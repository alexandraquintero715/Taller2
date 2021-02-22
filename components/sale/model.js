const mongoose = require('mongoose')
const Schema = mongoose.Schema

const detailSaleSchema = new mongoose.Schema({
  idBook: { type: Schema.Types.ObjectId, required: true, ref: 'books' },
  nombreLibro: { type: String, required: true },
  valorUnitario: { type: Number, required: true, min: 0 },
  cantidad: { type: Number, required: true, min: 1 }
})

const saleSchema = new mongoose.Schema({
  fecha: { type: Date, required: false, default: Date.now },
  total: { type: Number, required: true, min: 0 },
  idCliente: { type: Schema.Types.ObjectId, required: true, ref: 'clients' },
  details: {
    type: [detailSaleSchema],
    required: false,
    validate: {
      validator: (val) => {
        return Array.isArray(val) && val.length > 0
      },
      message: props => 'Sale must have at least one detail!'
    }
  },    
}, {
  timestamps: true
})

const Sale = mongoose.model('sales', saleSchema)

module.exports = Sale