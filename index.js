const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;



app.use(cors({
    origin: [
        "http://localhost:5000",
        "https://b-cycle-server.vercel.app",
    ],
    credentials: true,
}))
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c0auljw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {


        const cycleCollection = client.db("bCycleDB").collection('cycles');


        app.get('/cycles', async (req, res) => {
            const result = await cycleCollection.find().toArray();
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('BCYCLE Server is running')
})

app.listen(port, () => {

})