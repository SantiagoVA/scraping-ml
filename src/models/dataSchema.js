const mongoose = require('mongoose');
const schemaJson = new mongoose.Schema({
    
    jsonObject:  Object
        
});

module.exports = mongoose.model('schemaJson', schemaJson)