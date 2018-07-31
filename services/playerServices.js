var sequelize = require('../db');
const player = sequelize.import('../models/player')


exports.getAll = function(){
    return player.findAll({

    })
}

exports.getOnePlayer = function(req, id){
    return player.findOne({
        where: {
            id: req.params.id
        }
    })
}

exports.createPlayer = function(req){
    return player.create({
        playername: req.body.playername,
        position: req.body.position,
        role: req.body.role,
        technical: req.body.technical,
        mental: req.body.mental,
        physical: req.body.physical
    })
}

// exports.editPlayer = function(req, id){
//     return player.update({
//         playername: req.body.playername,
//         position: req.body.position,
//         role: req.body.role,
//         technical: req.body.technical,
//         mental: req.body.mental,
//         physical: req.body.physical
//     },
//     {where: {id: req.params.id}})
// }

exports.updatePlayer = function(req, res) {
    return player.update({
        playername: req.body.player.playername,
        position: req.body.player.position,
        role: req.body.player.role,
        technical: req.body.player.technical,
        mental: req.body.player.mental,
        physical: req.body.player.physical
    },
{where: {id: req.params.id}})
}

exports.deletePlayer = function(req){
    return player.destroy({
        where:{id: req.params.id}
    })
}