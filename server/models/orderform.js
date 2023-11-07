const mongoose = require('mongoose')

const orderFormSchema = new mongoose.Schema ({

    customerID:{
        type: String,
        
    },
    ProductID:{
        type: String,
        
    },
    Color:{
        type: String,
        
        unique: true,
    },
    Design:{
        type: String,
        
    },
    Size:{
        type: String,
        default : "admin"
    },

    Quantity:{
        type: Number,
        
    },

    modeOfPayment:{
        type: String,
    },

    dateCreated:{
        type: Date,
        default :Date,

    }
})

module.exports = mongoose.model("OrderForm", adminSchema)