const mongoose = require("mongoose");
const Schema = mongoose.Schema;  // Corrected 'schema' to 'Schema'

const userSchema = new Schema({
    name: {
        type: String,  // Data type
        required: true,  // Ensures this field must be provided
    },
    Numberof: {
        type: Number,  // Data type
        required: true,  // Ensures this field must be provided
    },
    phone: {
        type: Number,  // Data type
        required: true,  // Ensures this field must be provided
    }

});

module.exports = mongoose.model(
    "BoatRegistration",  // Model name, should be capitalized and without spaces
    userSchema  // Reference to the schema definition
);
