import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URL || "";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    // connect the client to the server
    await client.connect();

    // send a pign to confirm succeful connection
    await client.db("admin").command({ ping: 1} );
    console.log("Connected to MongoDB");
} catch (err) {
    console.error(err);
}

let db = client.db("user");

export default db;