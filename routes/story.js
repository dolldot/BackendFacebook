var express = require('express');
var router = express.Router();
var db = require('../config/db');
var jwt = require('jsonwebtoken');

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

// GET ALL STORY
router.get('/', verifikasi, function(req, res){
    db.story.findAll({
        include: [
            {
                model: db.users
            }
        ]
    })
    .then(story => {
        res.json(story);
    })
})

// GET STORY FOR SPECIFIC USER
router.get('/user/:id', verifikasi, function(req, res, next){
    var id = req.params.id;
  
    db.posts.findAll({
        include: [
            {
                model: db.users
            }
        ],
        where: {userId: id}
    }).then(story => {
        res.json(story)
    })
})

// GET SPECIFIC STORY
router.get('/:id', verifikasi, function(req, res, next){
    var id = req.params.id;
  
    db.story.findOne({
        include: [
            {
                model: db.users
            }
        ],
        where: {id: id}
    }).then(story => {
        res.json(story)
    })
})

router.post('/', verifikasi, function(req, res, next){
    var userId = req.body.userId;
    var src = req.body.src;

    db.story.create({
        userId: userId,
        src: src
    }).then(() => {
        db.story.findAll({
            include: [
                {model: db.users}
            ]
        }).then(posts => {
            res.json(posts)
        })
    })
})

// UPDATE STORY
router.put('/:id', verifikasi, function(req, res, next){
  var id = req.params.id;
  var userId = req.body.userid;
  var src = req.body.src;

    db.story.update({
        userId: userId,
        src: src
    }, {where: {id: id}}
    ).then(() => {
        db.story.findOne({
            include: [
                {
                    model: db.users
                }
            ],
            where: {id: id}
        }).then(story => {
            res.json(story)
        })
    })
})

// DELETE STORY
router.delete('/:id', verifikasi, function(req, res, next){
    var id = req.params.id;

    db.story.findOne({
        where: {userId: id},
    }).then(story => {
        if (!story) {
            return res.status(404).send();
        }
        story.destroy();
        res.status(200).send();
    })
})

module.exports = router;
