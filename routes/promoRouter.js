const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/').
get( (req, res, next)=>{ //getting or reading from database
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
post(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{ //posting new item to collection
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log("Post of Promotion ",promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
put(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{
    res.statusCode = 403; //no updating on a whole collection, not supported
    res.end("Put operation not supported")
}).
delete(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{ //dangerous op
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp); 
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
});

//for :id

promoRouter.route('/:promotionId').
get((req, res, next)=>{
    Promotions.findById(req.params.promotionId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
post(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end("Post operation on single item not supported - "+req.params.promotionId);
}).
put(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {new: true})
    .then((promotion)=>{
        console.log("Post of Promo ",promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
delete(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((promotion)=>{
        console.log("Delete of Promo ",promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
})

module.exports = promoRouter;