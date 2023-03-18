const express = require("express");
const app = express();

//Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
