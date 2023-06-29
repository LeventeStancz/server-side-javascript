const db = require('../config/db');

const Hairdresser = db.model('Hairdresser', {
    name: String,
    contact: String,
    pricing_min: Number,
    pricing_max: Number
});

module.exports = Hairdresser;