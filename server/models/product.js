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
    },
    sizes:{
        type: [String],
    },
    colors:{
        type: [String]
    },
    stocks:{
        type: String,
        required: true
    },
    price:{
        type: String
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