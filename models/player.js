module.exports = (sequelize, DataTypes) => {
    return sequelize.define('player', {
        playername: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 30]
            }
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 30]
            }
        },
        technical: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mental: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        physical: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        // Model: associate = (models) => {
        //     student.hasOne(models.socialMedia)
        //     student.hasMany(models.jobApplied)
        // }
    })
}