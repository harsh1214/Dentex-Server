// const sequelize = require("sequelize");  
module.exports = (sequelize, DataTypes) => {
    const doctors = sequelize.define("doctors", {
        doctorsId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        doctorName: {
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
        number: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
    });

    return doctors;
}

/* 
// doctors.associate = (models) => {
//     doctors.hasMany(models.Appointment, {
//         onDelete: "cascade",
//     });
// }

{
    "doctorName": "Saurav Rathi",
    "email": "saurav@mail.com",
    "number": 9658741230
}

,{
    as: "DoctorsId",
    foreignKey: "DoctorsId",
    onDelete: "cascade",
    targetKey: "DoctorsId"
}
,{
            foreignKey: 'doctorId', targetKey: 'doctorId'
        }
*/