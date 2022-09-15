const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/v1/userRoute")
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());

// get all user
app.use("/api/v1/user/all", userRoutes);
//create a user
app.use("/api/v1/user/save", userRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/delete", userRoutes);



app.get("/", (req, res) => {
    res.send("Hello World");
});

app.all("*", (req, res) => {
    res.send("NO route found.");
});

app.listen(port, () => {
    console.log(`Your app is running on port ${port}`);
});