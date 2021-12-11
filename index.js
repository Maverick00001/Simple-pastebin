const {
    port, mongo_url
} = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const pasteModel = require("./schemas/paste");


const app = express();
app.use(express.json());
mongoose.connect(mongo_url);
app.set("view engine", "ejs");
const urlEncodedParser = bodyParser.urlencoded({extended: false});


app.get("/", async (req, res) => {
    res.send("This is my pastebin's homepage!")
})


app.get("/new", async (req, res) => {
    res.render("new.ejs", {data: {message: ""}});
})

app.post("/submitted",urlEncodedParser, async (req, res) => {
    const uniqueID = (Math.floor(Math.random() * 9999999999) + 1).toString();
    const query = await pasteModel.findOne({identifier: uniqueID}, async (err, doc) => {
        if(doc === null){
            await pasteModel.create({code: req.body.code, identifier: uniqueID})
            res.send(`Successfully added your paste! Check it out at http://localhost:${port}/pastes/${uniqueID}`);
        }
        else{
            res.render("new.ejs", {data: {message: `An error has occured. Please try again!`}})
        }
    })
})

app.get("/pastes/:id", async (req, res) => {
    const query = await pasteModel.findOne({identifier: req.params.id}, (err, doc) => {
        if(doc === null){
            res.send("This paste does not exist!");
        }
        else{
            res.send(doc.code);
        }
    })
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})
