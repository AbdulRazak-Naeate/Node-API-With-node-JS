const express     = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');

const mongoose    = require('mongoose');
 require('dotenv').config();
const app         = express();

const port = 2000;

app.use(express.urlencoded({ extended: true }))

app.get("/",(req ,res)=>{
    res.send("We are home")
})


app.listen(port, () => {
    console.log("we are live on port " + port);
    
MongoClient.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true },(err,client)=>{
    if (err) {return console.log(err)
    }else{ 

        const db =client.db('notable');
        db.collection('notes').find({}).toArray(function(err, result){
            if(err) throw err;
           // console.log(result);
            //client.close();
            });
        console.log("Connected to DB!")
    

    require('./app/routes')(app,db);
}
   
  
}) 
 
})