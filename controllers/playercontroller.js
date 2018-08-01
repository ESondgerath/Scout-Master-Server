var express = require('express')
var router = express.Router()
var Player = require('../services/playerServices');
var Search = require('../routes/search-players');


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

// router.get(Search)

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

   Player.updatePlayer(req, req.params.id)
       
       .then(
           function updateSuccess() {
               res.json({
                   playername: req.body.playername,
                   position: req.body.position,
                   role: req.body.role,
                   technical: req.body.technical,
                   mental: req.body.mental,
                   physical: req.body.physical
               });            
           },
           function updateError(err){
               res.send(500, err.message);
           }
       )
});

// router.put('/edit', (req, res) => {

//     Player.updatePlayer(req, res)
//         .then(
//             function updateSuccess() {
//                 res.json({
//                     playername: req.body.player.playername,
//                     position: req.body.player.position,
//                     role: req.body.player.role,
//                     technical: req.body.player.technical,
//                     mental: req.body.player.mental,
//                     physical: req.body.player.physical
//                 });
//             },
//             function updateError(err) {
//                 res.send(500, err.message);
//             }
//         )
// });

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