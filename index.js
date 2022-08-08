const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

const appointmentRouter = require('./routes/Appointment');
app.use("/appointments", appointmentRouter);
const patientRouter = require('./routes/Patients');
app.use("/patients", patientRouter);
const doctorRouter = require('./routes/Doctors');
app.use("/doctors", doctorRouter);
const usersRouter = require('./routes/Users');
app.use("/users", usersRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});