
const express = require("express");
const router = express.Router();//esto es lo que cambia
const mongodb = require("mongodb");
const app= express()
const MongoClient = mongodb.MongoClient;

const clientes= require("./clientes")
const gestion= require("./gestion")

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clientes", clientes)// las peticiciones que lleguen precedidas por cleintes, ponlas en clientes
app.use("/gestion", gestion)

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },  function (error, client) {
    error 
    ? console.log(error) 
    : (app.locals.db = client.db("hotel"));//aqui es donde añado app.locals
    //app.locals esta dentro de cada llamada dentro del req
  }
);

app.listen(3000)