const { MongoClient } = require('mongodb');
const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z2qxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    // console.log("hello man")

    const database = client.db("urbanWoody");
    const productCollection = database.collection("products");
    const ordersCollection = database.collection("orders");

    // // get api
    app.get("/product", async (req, res)=>{

        // const query = { runtime: { $lt: 15 } };

        const cursor = productCollection.find({});
        const services = await cursor.toArray();
        // const result = await serviceCollection.insertOne(service);
        // console.log(result)
        res.send(services)
        // console.log(req.body)
    })
    
    // // single service get 
    app.get("/product/:id", async (req, res)=>{

        const id = req.params.id;
        const query = {_id: ObjectId(id)}

        const result = await productCollection.findOne(query);
        // console.log(result)
        res.json(result)
        // console.log(req.body)
    })

    // //post api
    app.post("/product", async (req, res)=>{
        const product = req.body;
        const result = await productCollection.insertOne(product);
        // console.log(product)
        res.json(result)
        // console.log(req.body)
    })

    app.post("/orders", async (req, res)=>{
        const product = req.body;
        const result = await ordersCollection.insertOne(product);
        // console.log(product)
        res.json(result)
        // console.log(req.body)
    })
  }
  finally{
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res)=>{
    res.send("hore krishno")
})

app.listen(port, ()=>{
    console.log(`lisiting port on ${port}`)
})