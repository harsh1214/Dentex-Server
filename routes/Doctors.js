const express = require('express');
const router = express.Router();
const { doctors } = require("../models");
     
router.get("/getDoctor", async (req, res) => {
     const Doctor = await doctors.findAll();
     res.json(Doctor);
});

router.get("/byDoctorId/:doctorsId", async (req, res) => {
    const doctorsId = req.params.doctorsId;
    const doctor = await doctors.findByPk(doctorsId);
     res.json(doctor);
});

router.get("/byDoctorName/:doctorName", async (req, res) => {
     const doctorName = req.params.doctorName;
     const doctor = await doctors.findAll({ where: { doctorName: doctorName}});
     res.json(doctor);
});

router.get("/totalDoctors", async (req, res) => {
     const totalDoctor = await doctors.count();
     res.json(totalDoctor);
});

router.post("/addDoctor", async (req, res) => {
     const Doctor = req.body;
     await doctors.create(Doctor);
     res.json(Doctor);
});

module.exports = router;