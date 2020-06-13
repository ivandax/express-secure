const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var trial = {
    "name": "Hot wings",
    "description": "Hotter than the sun",
    "image": "image/wings.png",
    "category": "dinner",
    "label": "1",
    "price": 22,
    "featured": true,
    "comments": []
}

var trial2 = {
    "name": "Superpizza",
    "description": "Epic!",
    "image": "image/pizza.png",
    "category": "dinner",
    "label": "2",
    "price": 4.77,
    "featured": true,
    "comments": [
        {
            "rating": 4,
            "comment": "loved it!",
            "author": "Rick Sanchez"
        }
    ]
}

var trial3 = {
    label: "hott"
}

var simpleComment = {
    "rating" : 5,
    "comment" : "Delicious",
}

const dishSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    label:{
        type: String,
        default: ''
    },
    price:{
        type: Currency,
        required: true,
        min: 0
    }, 
    featured: {
        type: Boolean,
        default: false
    },
    comments: [ commentSchema ]
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;