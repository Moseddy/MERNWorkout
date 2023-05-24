const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();


const workoutRoutes = require('./router/workoutRouter');

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use('/api/workout', workoutRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Database connected successfully and running on port",  process.env.PORT);
    })
}).catch((error) => {
    console.log(error.message)
})