const sequelize = require('../db');
const user = sequelize.import('../models/user');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.getAll = function(){
        return user.findAll({

        })
}

exports.getOneUser = function(req, id){
    return user.findOne({
        where: {
            id: req.params.id
        }
    })
}

exports.userLogin = function(req) {
    return user.findOne({
        where: {username: req.body.username}
    })
}

exports.createUser = function(req){
    return user.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
}

// exports.authenticateUser = function(req, res){
//     return userLogin(req)
//     .then(
//         function(user) {
//             if (user) {
//                 bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
//                     if (matches) {
//                         var token =  jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*2})
//                         // return sessionToken
//                         res.json({
//                             user: user,
//                             message: "Successfully Authenticated",
//                             sessionToken: token
//                         })
//                     } else {
//                         //password doesn't match
//                         // return err
//                         res.status(401).send({error: "Invalid Username/Password Combination, please try again."})
//                     }
//                 })
//             } else {
//                 // return err
//                 res.status(500).send({ error: "Failed to Authenticate"})
//             }
//         }
//     ),
//     //username not found
//     // res.json({
//     //     success: false,
//     //     error: 'Authentication failed, incorrect login credentials'
//     // });
//     function(err) {
//         res.status(502).send({ error: "Invalid Username/Password Combination, please try again."})
//     }
// }

exports.editUser = function(req){
    return user.update({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10)
    },
    {where: {id: req.params.id}})
}

exports.deleteUser = function(req){
    return user.destroy({
        where: {id: req.params.id}
    })
}