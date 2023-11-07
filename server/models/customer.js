const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema ({

    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },

    contactNum:{
        type: String,
        required: true
    },

    houseNo:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
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
        required: true
    },

    userType:{
        type: String,
        default : "customer",
    },
    
    dateCreated:{
        type: Date,
        default :Date,
    }
})

module.exports = mongoose.model("Customer", customerSchema)