var express = require('express')
var router = express.Router()
var User = require('../services/userServices');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


router.get('/', function(req, res) {

    User
    .getAll()
    .then(
      function findAllSuccess(data) {
          res.json(data);
      },
      function findAllError(err) {
          res.send(500, err.message);
      }
  );
})

router.post('/create', function(req, res) {

    User.createUser(req)
    .then(
        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

// router.post('/login', function(req, res) {
//     User.authenticateUser()
// })

router.post('/login', function(req, res){
    User.userLogin(req)
    .then(
        function (user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches){
                    if(matches){
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        })
                    } else {
                        res.status(401).send({error: "Invalid Username/Password Combination, please try again.1"})
                    }
                })
            } else {
            res.status(500).send({ error: "Failed to authenticate" })
            }
        },
        function (err) {
            res.status(401).send({ error: "Invalid Username/Password Combination, please try again.2"})
        }
    )
})

router.put('/update/:id', function(req, res) {
    var id = req.params.id;

    User.editUser(req, id)
        .then(
            function updateSuccess(user) {
                res.json({
                    user: user
                });            
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

router.get('/:id', function(req, res) {
    var id = req.params.id;

    User.getOneUser(req, id)
        .then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

router.delete('/deleteuser/:id', function(req, res) {
    var id = req.params.id;

    User.deleteUser(req, id)
        .then(
            function deleteSuccess(data) {
                res.send("User Deleted");
            },
            function deleteError(err) {
                res.send(500, err.message);
            }
        )
})

module.exports = router;