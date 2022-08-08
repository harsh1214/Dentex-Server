// const sequelize = require("sequelize");  
module.exports = (sequelize, DataTypes) => {
    const patients = sequelize.define("patients", {
        patientId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        patientName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        allergies: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.STRING,
        },
    });

    return patients;
}

/*
   // Patients.associate = (models) => {
    //     Patients.hasMany(models.Appointment, {
    //         onDelete: "cascade",
    //     });
    // }

{
    "patientName": "Harsh",
    "email": "harsh@mail.com",
    "number": 2323232323,
    "gender": "male",
    "allergies": "none",
    "notes": "none"
}

    , {

    as: "PatientId",
    foreignKey: "PatientId",
    onDelete: "cascade",
    targetKey: "PatientId"
}
, {
            foreignKey: 'patientId', targetKey: 'patientId'
        }
*/