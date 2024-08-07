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

router.get("/:searchTerm", async (req, res) => {
    let collection = await db.collection("items");
    let results = await collection.find({
        $or: [
            { name: { $regex: req.params.searchTerm, $options: 'i' } },
            { company: { $regex: req.params.searchTerm, $options: 'i' } }
            ]
    }).toArray();
    res.send(results).status(200);
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
        res.send(results).status(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("error creating item");
    }
});

export default router;