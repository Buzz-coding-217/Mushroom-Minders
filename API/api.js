const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 4000;
const SCD = require('./models/SCD');
const soil = require('./models/soil');

mongoose.connect('mongodb+srv://mushroom:monitor@mushroom.toqpt0l.mongodb.net/Devices', {useNewUrlParser: true, useUnifiedTopology: true });

app.get('/test', (req, res) => {
  res.send('The API is working!');
});

app.get('/scd/one/:device', async (req, res) => {
    const name = req.params.device;
    const device = await SCD.findOne({ device: name });
  
    if (!device) {
      return res.status(404).send({ message: 'Device not found' });
    }
  
    res.status(200).send(device);
  });
  
  app.get('/scd/devices', async (req, res) => {
    const device = await SCD.find({});
    res.status(200).send(device)
  })
  
  app.post('/scd/devices', async (req, res) => {
    const device = new SCD(req.body);
    await device.save();
    res.status(201).send(device);
  });
  
  app.delete('/scd/devices/:device', async (req, res) => {
    const name = req.params.device;
    const deletedDevice = await SCD.findOneAndDelete({ device: name });
  
    if (!deletedDevice) {
      return res.status(404).send({ message: 'Device not found' });
    }
  
    res.status(200).send(deletedDevice);
  });
  
  app.put('/scd/devices/:device', async (req, res) => {
    const update = req.params.device;
    const updatedDevice = await SCD.findOneAndUpdate({ device: update }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!updatedDevice) {
      return res.status(404).send({ message: 'Device not found' });
    }
    res.status(200).send(updatedDevice);
  });

  app.get('/soil/one/:device', async (req, res) => {
    const name = req.params.device;
    const device = await soil.findOne({ device: name });
  
    if (!device) {
      return res.status(404).send({ message: 'Device not found' });
    }
  
    res.status(200).send(device);
  });
  
  app.get('/soil/devices', async (req, res) => {
    const device = await soil.find({});
    res.status(200).send(device)
  })
  
  app.post('/soil/devices', async (req, res) => {
    const device = new soil(req.body);
    await device.save();
    res.status(201).send(device);
  });
  
  app.delete('/soil/devices/:device', async (req, res) => {
    const name = req.params.device;
    const deletedDevice = await soil.findOneAndDelete({ device: name });
  
    if (!deletedDevice) {
      return res.status(404).send({ message: 'Device not found' });
    }
  
    res.status(200).send(deletedDevice);
  });
  
  app.put('/soil/devices/:device', async (req, res) => {
    const update = req.params.device;
    const updatedDevice = await soil.findOneAndUpdate({ device: update }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!updatedDevice) {
      return res.status(404).send({ message: 'Device not found' });
    }
    res.status(200).send(updatedDevice);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});