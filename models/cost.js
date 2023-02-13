const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

const Cost = mongoose.models.Cost || mongoose.model('Cost', costSchema);

module.exports = Cost;
