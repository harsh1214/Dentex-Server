const express = require('express');
const router = express.Router();
const { patients, appointments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/getPatient", async (req, res) => {
     const Patient = await patients.findAll();
     res.json(Patient);
});

router.get("/byPatientId/:patientId", async (req, res) => {
     const patientId = req.params.patientId;
     const patient = await patients.findByPk(patientId);
     // const appointment = await appointments.findAll({ where: { patientPatientId: patientId}})
     res.json(patient);
});

router.get("/getAppointmentByPatientId/:patientId", async (req, res) => {
     const patientId = req.params.patientId;
     const appointment = await appointments.findAll({ where: { patientPatientId: patientId}, order: [['appointmentDate', 'DESC'],['appointmentTime', 'DESC']]})
     res.json(appointment);
});

router.get("/byPatientName/:patientName", async (req, res) => {
     const patientName = req.params.patientName;
     const patient = await patients.findAll({ where: { patientName: patientName}});
     res.json(patient);
});

router.delete('/byPatientId/delete/:patientId', async (req, res) => {
     const patientID = req.params.patientId;
     const deletePatient = await patients.destroy({ where: { patientId: patientID }});
     res.json("success");
});

router.get("/totalPatients", async (req, res) => {
     const totalPatient = await patients.count();
     res.json(totalPatient);
});

router.post("/addPatient", validateToken , async (req, res) => {
     const Patient = req.body;
     await patients.create(Patient);
     //  console.log(Patient);
     res.json(Patient);
});

module.exports = router;