// const sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirmPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        OTP: {
            type: DataTypes.INTEGER,
        }
    });

    return users;
}
/*
 // authority: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
{
    "name": "Raghav",
    "username": "raghav@123",
    "password": "raghav123",
    "status": "doctor"
}
*/