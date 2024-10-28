import express from 'express';

// this will help us connect to the database
import db from '../db/connection.js';

// this help convert the id from string to ObjectId for the _id
import { ObjectId } from 'mongodb';

const router = express.Router();

// get a list of all items
router.get("/", async (req, res) => {
    let collection = await db.collection("items");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// get a list of all items with matching name and company
router.get("/:searchTerm", async (req, res) => {
    let collection = await db.collection("items");
    let query = {
        $or: [
            { name: { $regex: req.params.searchTerm, $options: 'i' } },
            { company: { $regex: req.params.searchTerm, $options: 'i' } }
            ]
    };
    let results = await collection.find(query).toArray();
    res.status(200).send(results);
});

// get details about a specific item
router.get("/item/:id", async (req, res) => {
    let collection = await db.collection("items");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    res.status(200).send(result);
});

// add a new item to the collection
router.post("/", async (req, res) => {
    try {
        let newItem = {
            name: req.body.name,
            company: req.body.company,
        };
        let collection = await db.collection("items");
        let results = await collection.insertOne(newItem);
        res.status(201).send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("error creating item");
    }
});

// add a new delivery
router.post("/delivery/:id", async (req, res) => {
    try {
        let newDelivery = req.body;
        let collection = await db.collection("items");
        let filter = { _id: new ObjectId(req.params.id) };
        let query = {
            $push: { deliveries: newDelivery }
        };
        let result = await collection.updateOne(filter, query);
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("error creating delivery");
    }
});

export default router;