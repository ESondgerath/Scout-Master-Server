var sequelize = require('../db');
const user = sequelize.import('../models/user')


exports.getAll = function(){
        return user.findAll({

        })
}

exports.getOneUser = function(req, id){
    return user.findOne({
        where: {
            id:req.params.id
        }
    })
}

exports.createUser = function(req){
    return user.create({
        username: req.body.user.username,
        email: req.body.user.email,
        // password : bcrypt.hashSync(req.body.user.password, 10)
        password: req.body.user.password
        // token: jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*2})
    })
}

exports.authenticateUser = function(req, res){
    return user.findOne({where: {email: req.body.user.email} } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    if (matches) {
                        var sessionToken =  jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*2})
                        return sessionToken
                        // res.json({
                        //     user: user.id,
                        //     message: "Successfully Authenticated",
                        //     sessionToken: token
                        // })
                    } else {
                        //password doesn't match
                        return err
                        // res.json({
                        //     success: false,
                        //     error: 'Authentication failed, incorrect login credentials'
                        // });
                    }
                })
            } else {
                return err
                //account doesn't exist
                // res.json({
                //     success: false,
                //     error: 'Authentication failed, incorrect login credentials'
                // });
            }
        }
    )
    //email not found
    res.json({
        success: false,
        error: 'Authentication failed, incorrect login credentials'
    });
}

exports.editUser = function(req, id){
    return user.update({
        username: req.body.user.username,
        email: req.body.user.email,
        password: req.body.user.password
    },
    {where: {username: data}})
}

/*
router.put('/update/:beername', function(req, res) {
    var data = req.params.beername;
    var mybeershad = req.body.mybeershad
    
    AuthBeerData
        .update({ 
            mybeershad : mybeershad.item,
            myrating : mybeershad.myrating,
        },
        {where: {beername: data}}
        )
});
*/

exports.deleteUser = function(req, id){
    return user.destroy({
        where:{id: req.params.id}
    })
}