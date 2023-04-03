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

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mushroom API\'s',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:4000'
      }
    ]
  },
  apis: ['./api.js']
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

mongoose.connect('mongodb+srv://mushroom:monitor@mushroom.toqpt0l.mongodb.net/Devices', {useNewUrlParser: true, useUnifiedTopology: true });

//  *********** SCD *************

/**
 * @swagger
 * tags:
 *   name: SCD Devices
 *   description: API endpoints for SCD devices
 */

/**
 * @swagger
 *  components:
 *      schema:
 *        Devices:
 *          type: object 
 *          properties: 
 *              device:
 *                type: string
 *              sensorData:
 *                type: array
*/

/**
 * @swagger
 * /scd/one/{device}:
 *   get:
 *     summary: Get a single SCD device by name
 *     description: Fetch information from the MongoDB database
 *     tags: [SCD Devices]
 *     parameters:
 *       - in: path
 *         name: device
 *         required: true
 *         description: Name of the SCD device to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns an array with a single SCD device
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Devices'
 */


app.get('/scd/one/:device', async (req, res) => {
    const name = req.params.device;
    const device = await SCD.findOne({ device: name });
  
    if (!device) {
      return res.status(404).send({ message: 'Device not found' });
    }
  
    res.status(200).send(device);
  });

/**
 * @swagger
 * /scd/devices:
 *  get:
 *      summary: To get all the SCD devices
 *      description: Fetch information from the mongodb database
 *      tags: [SCD Devices]
 *      responses: 
 *        200:
 *          description: This API will fetch data from server
 *          content: 
 *              application/json:
 *                schema:
 *                    type: array
 *                    items: 
 *                        $ref: '#components/schema/Devices'
 */
  
  app.get('/scd/devices', async (req, res) => {
    const device = await SCD.find({});
    res.status(200).send(device)
  })
  
/**
 * @swagger
 * /scd/devices:
 *  post:
 *      summary: To Post a request to the database to add a SCD device
 *      description: Post information to the mongodb database
 *      tags: [SCD Devices]
 *      requestBody:
 *            required: true
 *            content: 
 *              application/json:
 *                schema:
 *                    $ref: '#components/schema/Devices'
 *      responses:
 *          200:
 *              description: Successfully added
 *          
 */

  app.post('/scd/devices', async (req, res) => {
    const device = new SCD(req.body);
    await device.save();
    res.status(201).send(device);
  });
  
/**
 * @swagger
 * /scd/devices/{device}:
 *  delete:
 *      summary: Delete SCD device from the database
 *      description: Find and delete data from database
 *      tags: [SCD Devices]
 *      parameters:
 *          - in: path
 *            name: device
 *            required: true
 *            description: Device's Name
 *            schema:
 *              type: string
 *      responses: 
 *        200:
 *          description: Deleted Successfully
 */

  app.delete('/scd/devices/:device', async (req, res) => {
    const name = req.params.device;
    const deletedDevice = await SCD.findOneAndDelete({ device: name });
  
    if (!deletedDevice) {
      return res.status(404).send({ message: 'Device not found' });
    }
  
    res.status(200).send(deletedDevice);
  });

 /**
 * @swagger
 * /scd/devices/{device}:
 *  put:
 *      summary: Exchange the information of a device
 *      description: Fetch and update data from database
 *      tags: [SCD Devices]
 *      parameters:
 *          - in: path
 *            name: Device
 *            required: true
 *            description: Device's Name
 *            schema:
 *              type: string
 *      requestBody:
 *            required: true
 *            content: 
 *              application/json:
 *                schema:
 *                    $ref: '#components/schema/Devices'
 *      responses:
 *        200:
 *          description: Updated successfully
 *          content:
 *              application/json:
 *                schema:
 *                    type: array
 *                    items: 
 *                        $ref: '#components/schema/Devices'
 */
  
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

//  *********** SOIL *************

/**
 * @swagger
 * tags:
 *   name: Soil Devices
 *   description: API endpoints for Soil devices
 */

/**
 * @swagger
 * /soil/one/{device}:
 *  get:
 *      summary: To get a Soil device from database
 *      description: Fetch information from the mongodb database
 *      tags: [Soil Devices]
 *      parameters:
 *          - in: path
 *            name: device
 *            required: true
 *            description: Device's Name
 *            schema:
 *              type: string
 * 
 *      responses: 
 *        200:
 *          description: This API will fetch data from server
 *          content: 
 *              application/json:
 *                schema:
 *                    type: array
 *                    items: 
 *                        $ref: '#components/schema/Devices'
 */
  app.get('/soil/one/:device', async (req, res) => {
    const name = req.params.device;
    const device = await soil.findOne({ device: name });
  
    if (!device) {
      return res.status(404).send({ message: 'Device not found' });
    }
  
    res.status(200).send(device);
  });

  /**
 * @swagger
 * /soil/devices:
 *  get:
 *      summary: To get all the Soil devices
 *      description: Fetch information from the mongodb database
 *      tags: [Soil Devices]
 *      responses: 
 *        200:
 *          description: This API will fetch data from server
 *          content: 
 *              application/json:
 *                schema:
 *                    type: array
 *                    items: 
 *                        $ref: '#components/schema/Devices'
 */
  
  app.get('/soil/devices', async (req, res) => {
    const device = await soil.find({});
    res.status(200).send(device)
  })
  
/**
 * @swagger
 * /soil/devices:
 *  post:
 *      summary: To Post a request to the database to add a Soil device
 *      description: Post information to the mongodb database
 *      tags: [Soil Devices]
 *      requestBody:
 *            required: true
 *            content: 
 *              application/json:
 *                schema:
 *                    $ref: '#components/schema/Devices'
 *      responses:
 *          200:
 *              description: Successfully added
 *          
 */

  app.post('/soil/devices', async (req, res) => {
    const device = new soil(req.body);
    await device.save();
    res.status(201).send(device);
  });
  
/**
 * @swagger
 * /soil/devices/{device}:
 *  delete:
 *      summary: Delete Soil device from the database
 *      description: Find and delete data from database
 *      tags: [Soil Devices]
 *      parameters:
 *          - in: path
 *            name: device
 *            required: true
 *            description: Device's Name
 *            schema:
 *              type: string
 *      responses: 
 *        200:
 *          description: Deleted Successfully
 */

  app.delete('/soil/devices/:device', async (req, res) => {
    const name = req.params.device;
    const deletedDevice = await soil.findOneAndDelete({ device: name });
  
    if (!deletedDevice) {
      return res.status(404).send({ message: 'Device not found' });
    }
  
    res.status(200).send(deletedDevice);
  });
  
/**
 * @swagger
 * /soil/devices/{device}:
 *  put:
 *      summary: Exchange the information of a device
 *      description: Fetch and update data from database
 *      tags: [Soil Devices]
 *      parameters:
 *          - in: path
 *            name: Device
 *            required: true
 *            description: Device's Name
 *            schema:
 *              type: string
 *      requestBody:
 *            required: true
 *            content: 
 *              application/json:
 *                schema:
 *                    $ref: '#components/schema/Devices'
 *      responses:
 *        200:
 *          description: Updated successfully
 *          content:
 *              application/json:
 *                schema:
 *                    type: array
 *                    items: 
 *                        $ref: '#components/schema/Devices'
 */

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