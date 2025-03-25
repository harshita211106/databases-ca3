
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// mongodb connection

mongoose.connect("mongodb+srv://harshitabhingare21:databases-ca3@cluster0.stenp.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB Error:", err));


//   schema
const restaurants = mongoose.model("Restaurant", { 
    name: String,
     location: String,
    cuisine: String,
    rating:Number,
    menu:String

});



app.get("/", (req, res) => res.send("Restaurant API is running"))
;


app.route("/restauants")
  .get(async (req, res) => res.json(await restaurants.find()))
  .post(async (req, res) => res.status(201).json(await new restaurants(req.body).save()));

app.route(" restaurants/:id")
  .get(async (req, res) => res.json(await restaurants.findById(req.params.id) || { error: "Not found" }))
  .put(async (req, res) => res.json(await restaurants.findByIdAndUpdate(req.params.id, req.body, { new: true }) || { error: "Not found" }))
  .delete(async (req, res) => res.json(await restaurants.findByIdAndDelete(req.params.id) ? { message: "Deleted" } : { error: "Not found" }));

app.use((_, res) => res.status(404).json({ error: "Route not found" }));
app.listen(5000, () => console.log("Server running on port 5000"));





























































