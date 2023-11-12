const mongoose = require('mongoose')
const Customer = require('./customer');
const Product = require('./product');

const orderFormSchema = new mongoose.Schema ({

    customerID:{
        type: mongoose.Schema.ObjectId, 
        ref: "Customer"
    },
    productID:{
        type: mongoose.Schema.ObjectId, 
        ref: "Product"
    },
    isCheckedOut:{
        type: Boolean,
        default: false
    },

    isDelivered:{
        type: Boolean,
        default: false
    },

    isCancelled:{
        type: Boolean,
        default: false
    },

    color:{
        type: String,
    
    },
    design:{
        type: String,
        
    },
    size:{
        type: String,
    },

    quantity:{
        type: Number,
        default: 1
    },

    total:{
        type:Number,
        default: 0
    },

    firstName:{
        type: String,
    },
    lastName:{
        type: String,
       
    },

    contactNum:{
        type: String,
       
    },

    houseNo:{
        type: String,
       
    },
    street:{
        type: String,
       
    },
    baranggay:{
        type: String,
    },
    city:{
        type: String,

    },
    province:{
        type: String,
    },
    zip:{
        type: String,
       
    },

    note:{
        type: String,
    },

    title :{
        type: String,
    },
    category :{
        type: String,
    },
    price :{
        type: String,
    },

    modeOfPayment:{
        type: String,
    },

    dateCreated:{
        type: Date,
        default :Date
    }
})

module.exports = mongoose.model("OrderForm", orderFormSchema)