const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const toDoList = [
  {task: "Buy diaper", done: false},
  {task: "Change light bulb", done: false},
  {task: "Do homework", done: false},
  {task: "Clean room", done: false},
  {task: "Take wife out", done: false}
];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//give access to public files such as css and html files
app.use(express.static("public"));

//get index.html file
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index"));
});

app.get("/api/todolist", function(req, res) {
  res.json(toDoList);
});

app.post("/api/todolist", function(req, res) {
  toDoList.push(req.body);
  res.json(toDoList);
});

app.delete("/api/todolist/:deleteID", function(req, res) {
  toDoList.splice(req.params.deleteID, 1);
  res.end();
});

app.listen(PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
});
