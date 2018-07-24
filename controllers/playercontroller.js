var express = require('express')
var router = express.Router()
var Player = require('../services/playerServices');


router.get('/', function(req, res) {

    Player
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

    Player.createPlayer(req)
    .then(
        function createSuccess(player) {
            res.json({
                player: player
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.put('/edit/:id', function(req, res) {
    var data = req.params.id;

    Player.editPlayer(data)
        
        .then(
            function updateSuccess(player) {
                res.json({
                    player: player
                });            
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

router.get('/details/:id', function(req, res) {
    var id = req.params.id;

    Player.getOnePlayer(req, id)
        .then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

router.delete('/deleteplayer/:id', function(req, res) {
    var id = req.params.id;

    Player.deletePlayer(req, id)
        .then(
            function deleteSuccess(data) {
                res.send("Player Deleted");
            },
            function deleteError(err) {
                res.send(500, err.message);
            }
        )
})

module.exports = router;