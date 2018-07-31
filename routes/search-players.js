var sequelize = require('../db');
const playerModel = sequelize.import('../models/player');

module.exports = function getAllPlayers(req, res) {

    const
    filter = req.query.filter || '',
    sortOrder = req.query.sortOrder,
    pageNumber = parseInt(req.query.pageNumber) || 0,
    pageSize = parseInt(req.query.pageSize);
    
    let Players = Object.values(playerModel.findAll()).filter(player => player.id == id).sort((l1, l2) => l1.id - l2.id)

    if (filter) {
        Players = Players.filter(player => player.playername.search(filter.toLowerCase()) >=0);
    }

    if (sortOrder == "desc") {
        Players = Players.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const PlayersPage = Players.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({payload: PlayersPage});
    }, 1000);

}