const mqtt = require('mqtt');
const express = require('express');
const mongoose = require('mongoose');
const SCD = require('./models/SCD');
const Soil = require('./models/soil');

const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://mushroom:monitor@mushroom.toqpt0l.mongodb.net/Devices', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 4001;

const app = express();
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    client.subscribe('/mushroom/scd');
    client.subscribe('/mushroom/soil');
    console.log('mqtt connected');
});

client.on('message', async (topic, message) => {
    if (topic == '/mushroom/scd') {
        const data = JSON.parse(message);
        console.log(data);
        try {
            let device = await SCD.findOne({ "device": data.device }).exec();
            const { temp } = data;
            const { co2 } = data;
            const { hum } = data;
            const now = new Date();
            const time = now.toISOString();

            const y = await SCD.updateOne({ 'device': data.device }, {
                $push: {
                    'sensorData': {
                        'time': time,
                        'co2': data.co2,
                        'hum': data.hum,
                        'temp': data.temp
                    }
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    else if (topic == '/mushroom/soil') {
        const data = JSON.parse(message);
        console.log(data);
        try {
            let device = await Soil.findOne({ "device": data.device }).exec();
            const { soil } = data;
            const now = new Date();
            const time = now.toISOString();

            const y = await Soil.updateOne({ 'device': data.device }, {
                $push: {
                    'sensorData': {
                        'time': time,
                        'soil': data.soil
                    }
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});