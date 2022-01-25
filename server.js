//DEPENDENCIES
const express = require ('express');

const app = express();

const { PORT = 4000 , DATABASE_URL } = process.env;

require('dotenv').config();

const mongoose = require('mongoose');

const cors = require('cors');

const morgan = require('morgan');


//DB CONNECTION

mongoose.connect(process.env.DATABASE_URL,{
    //useNewUrlParser: true,
    //useUnifiedTopology: true
})

//connection events

mongoose.connection
    .on('open', () => console.log('Connected'))
    .on('close', () => console.log('disconnected'))
    .on('error', () => console.log('error'));


//models


const RandomSchema= new mongoose.Schema({
    name: String,
    image: String,
    title: String
});

const Random =  mongoose.model('Random', RandomSchema);


//Middleware

app.use(cors()); //to prevent cors errors, open access to all origins
app.use(morgan('dev')); //logging
app.use(express.json()); //parse json bodies

//ROUTES
//ROUTES

//randomRouter.get('/', (req, res) => {
  //  res.send('Hello world')
//});

//Random index route

app.get('/random', async (req, res) =>{
    try{
        //send all 
        res.json(await Random.find({}))
    } catch (err){
        res.status(400).json(err)
    }
});

//Delete

app.delete('/random/:id', async(req, res) =>{
    try{
        res.json(await Random.findByIdAndRemove(req.params.id))
    } catch(error){
        res.status(400).json(err)
    }
});

//Update

app.put('/random/:id', async(req, res) =>{
    try{
        res.json(
            await Random.findByIdAndUpdate(req.params.id, req.body, {new: true})
        );
    } catch (err){
        res.status(400).json(err);
    }
});

//Create

app.post('/random', async (req, res) =>{
    try{
        //send all people
        res.json(await Random.create(req.body))
    } catch(err){
        res.status(400).json(error);
    }
});


//Listener

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))


