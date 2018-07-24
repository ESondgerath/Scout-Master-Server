var express = require('express')
var router = express.Router()
var User = require('../services/userServices');


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
            res.json({
                user: user
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.put('/update/:id', function(req, res) {
    var id = req.params.username;

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