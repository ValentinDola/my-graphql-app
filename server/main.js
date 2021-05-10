const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();

// Adding Middleware
app.use(cors());
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql : true
}));

// Connect to database
const url = "mongodb+srv://Valentin:tino1234@cluster0.qmjt7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser: true})
    .then(r => console.log('Connected') )
    .catch(err => console.log(err))

// Listening for the app on 9000
app.listen( 9000 , () => {
    console.log('App running on port 9000')
})
