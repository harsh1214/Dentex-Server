// const sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const appointments = sequelize.define("appointments", {
        appointmentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        patientName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        doctorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        appointmentDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        appointmentTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
    });

    appointments.associate = (models) => {
        appointments.belongsTo(models.patients);
        appointments.belongsTo(models.doctors);
    }
    
    return appointments;
}

/*
{
    "patientName": "Harsh Yadav",
    "doctorName": "Khusbhu Gupta",
    "appointmentDate": "2022-01-16",
    "appointmentTime": "12:25:00",
    "patientPatientId": 1,
    "doctorDoctorsId": 3
}
{
    "patientName": "Harsh Yadav",
    "doctorName": "Khusbhu Gupta",
    "appointmentDate": "2022-01-16",
    "appointmentTime": "20:25:00"
}
        // appointmentFeesStatus: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false
        // },
        // fees: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
, {
    foreignKey: "PatientId",
    targetKey: "PatientId"
}
, {
    targetKey: "DoctorId",
    foreignKey: "DoctorId"
}
// doctorId: {
        //     type: DataTypes.INTEGER,
        // },
        // patientId: {
        //     type: DataTypes.INTEGER,
        // },
*/
// Appointments.belongsTo(models.Patients);
// Appointments.belongsTo(models.Doctors);