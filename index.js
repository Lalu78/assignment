import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const app = express()
const PORT = 9000;


//Database Connectivity

//const URL = "mongodb+srv://user:12345@cluster0.t1kke.mongodb.net/RESTAPI?retryWrites=true&w=majority";

const Connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Sample", { useNewUrlParser: true });
        console.log("database connected successfullly")
    } catch (error) {
        console.log("error while connectiong data base",error)
    }
  
}
Connection();
// db connectivity end

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})
// creating user schema

const newSchema = mongoose.Schema({
    firstname: {
        type: String,
        required:true,
    },
    lastname: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    }
})

const Users = mongoose.model('Users', newSchema);

// creating oders schema


const newSchema1 = mongoose.Schema({
    Product_name: {
        type: String,
        required:true,
    },
    Status: {
        type: String,
        required:true
    }
},
{
    timestamps:true
}
)

const Oders = mongoose.model('Oders', newSchema1);

//post data
app.post('/create/users', async(req, res) => {
    let data = await Users.create(req.body);
    res.status(200).json({
        success: true,
        data
    })
})

app.post('/create/orders', async(req, res) => {
    let data = await Oders.create(req.body);
    res.status(200).json({
        success: true,
        data
    })
})

//Get data

app.get("/get/users", async (req, res) => {
    let data = await Users.find({})
    res.status(200).json({
        success: true,
        data
    })
})


app.get("/get/orders", async (req, res) => {
    let data = await Oders.find({})
    res.status(200).json({
        success: true,
        data
    })
})

app.get("/get/orders/:id", async (req, res) => {
    let data = await Oders.findById(req.params.id)
    res.status(200).json({
        success: true,
        data
    })
})



