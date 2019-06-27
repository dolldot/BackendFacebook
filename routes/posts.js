var express = require('express');
var router = express.Router();
var db = require('../config/db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const SECRET_KEY = 'kalem';

function verifikasi(req, res, next){
  var header = req.headers['authorization'];
  if(typeof header === 'undefined'){
    console.log("Harus make token cuy");
  } else {
    var tokenUtuh = header.split(' ');
    var tipe = tokenUtuh[0];
    var token = tokenUtuh[1];

    if(tipe !== 'Bearer'){
      console.log("harus JWT cuy");
    }

    jwt.verify(token, SECRET_KEY, function(err, decoded){
      if(err) {
        console.log("Error : " + err);
        res.status(400).send("Token Not Valid");
      }
      
    })
    next();
  }
}

// GET ALL POST
router.get('/', verifikasi, function(req, res){
    db.posts.findAll({
        include: [{model: db.users}]
    })
    .then(posts => {
        res.json(posts);
    })
})

// GET POST FOR SPECIFIC USER
router.get('/user/:id', verifikasi, function(req, res, next){
    var id = req.params.id;
  
    db.posts.findOne({
        include: [
            {model: db.users}
        ],
        where: {userId: id}
    }).then(posts => {
        // res.send(JSON.stringify({"Status": 200, "error": null, "results": posts}))
        res.json(posts)
    })
})

// GET SPECIFIC POST
router.get('/:id', verifikasi, function(req, res, next){
    var id = req.params.id;
  
    db.posts.findAll({
        include: [
            {model: db.users}
        ],
        where: {id: id}
    }).then(posts => {
        res.json(posts)
    })
})

// CREATE A POST
router.post('/', verifikasi, function(req, res, next){
    var userId = req.body.userId;
    var content = req.body.content;

    db.posts.create({
        userId: userId,
        content: content
    }).then(() => {
        db.posts.findAll({
            include: [
                {model: db.users}
            ]
        }).then(posts => {
            res.json(posts)
        })
    })
})

// UPDATE POST
router.put('/:id', verifikasi, function(req, res, next){
  var id = req.params.id;
  var userId = req.body.userid;
  var content = req.body.content;

    db.posts.update({
        userId: userId,
        content: content
    }, {where: {id: id}}
    ).then(() => {
        db.posts.findAll({
            include: [
                {model: db.users}
            ],
            where: {id: id}
        }).then(post => {
            res.json(post)
        })
    })
})

// DELETE POST
router.delete('/:id', verifikasi, function(req, res, next){
    var user = req.params.user;
    var id = req.params.id;

    db.posts.findOne({
        where: {userId: id},
    }).then(post => {
        if (!post) {
            return res.status(404).send();
        }
        post.destroy();
        res.status(200).send();
    })
})

module.exports = router;
