const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/').
get( (req, res, next)=>{ //getting or reading from database
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
post(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{ //posting new item to collection
    Leaders.create(req.body)
    .then((leader)=>{
        console.log("Post of leader ",leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
put(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{
    res.statusCode = 403; //no updating on a whole collection, not supported
    res.end("Put operation not supported")
}).
delete(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{ //dangerous op
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp); 
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
});

//for :id

leaderRouter.route('/:leaderId').
get((req, res, next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
post(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{
    res.statusCode = 403;
    res.end("Post operation on single item not supported - "+req.params.leaderId);
}).
put(authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {new: true})
    .then((leader)=>{
        console.log("Post of Promo ",leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
delete(authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((leader)=>{
        console.log("Delete of Promo ",leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
})

module.exports = leaderRouter;