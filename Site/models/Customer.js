const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Customer = db.model('Customer', {
    name: String,
    contact: String,
    last_visit: { type: Date, default: Date.now },
    avg_time: String,
    _hairdresser: {
        type: Schema.Types.ObjectId,
        ref: 'Hairdresser'
    }
});

module.exports = Customer;