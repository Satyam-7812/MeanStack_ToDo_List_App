var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    assigned:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    date:{ type: String,
        required: true
    }
    
});


module.exports = mongoose.model('employees',userShema);