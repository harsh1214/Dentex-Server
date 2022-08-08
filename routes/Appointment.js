const express = require('express');
const router = express.Router();
const { appointments, patients, doctors } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

const current = new Date();
const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

router.get("/getAppointment", async (req, res) => {
     const Appointment = await appointments.findAll();
     res.json(Appointment);
});

router.get("/byAppointmentId/:appointmentId", async (req, res) => {
     const appointmentId = req.params.appointmentId;
     const appointment = await appointments.findByPk(appointmentId);
     res.json(appointment);
});

router.delete('/byAppointmentId/delete/:appointmentId', validateToken, async (req, res) => {
     const appointmentID = req.params.appointmentId;
     await appointments.destroy({ where: { appointmentId: appointmentID } });
     res.json("Appointment Deleted");
});

router.get("/totalAppointments", async (req, res) => {
     const totalAppointment = await appointments.count();
     res.json(totalAppointment);
});

router.get("/todaysAppointment", async (req, res) => {
     const todaysAppointment = await appointments.findAll({ where: { appointmentDate: date }, order: [['appointmentTime', 'ASC']] });
     res.json(todaysAppointment);
});

router.get("/todaysTotalAppointment", async (req, res) => {
     const todaysTodaysAppointment = await appointments.count({ where: { appointmentDate: date } });
     res.json(todaysTodaysAppointment);
});

router.post("/addAppointment", validateToken, async (req, res) => {
     const patientName = req.body.patientName;
     const patient = await patients.findAll({ where: { patientName: patientName } });
     if (!patient[0]) {
          res.json({ error: "Patient Doesn't Exist" })
     }
     else {
          const appointment = req.body;
          const doctorName = req.body.doctorName;
          const doctor = await doctors.findAll({ where: { doctorName: doctorName } });
          appointment.patientPatientId = patient[0].patientId;
          appointment.doctorDoctorsId = doctor[0].doctorsId;
          if (appointment.appointmentTime < "08:59:00" && appointment.appointmentTime >= "18:00:00") {
               res.json({ error: "Appointment Schedule over time" })
          }
          else {
               if (appointment.appointmentTime < "14:30:00" && appointment.appointmentTime >= "14:00:00") {
                    res.json({ error: "Break Time" })
               }
               else {
                    await appointments.create(appointment);
                    res.json(appointment);
               }
          }
     }
});

module.exports = router;