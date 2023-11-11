const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    designs:{
        type: [String],
        default: null
    },
    sizes:{
        type: [String],
        default: null

    },
    colors:{
        type: [String],
        default: null

    },
    stocks:{
        type: Number,
        required: true
    },
    price:{
        type: Number
    },
    image:{
        type: String,
        // required: true
    },
    thumbnail:{
        type: String,
        // required: true
    },

    dateCreated:{
        type: Date,
        default :Date,
    }
})

module.exports = mongoose.model("Product", productSchema)