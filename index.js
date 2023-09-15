const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("views", "./public/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public/css/stylesheet.css"));

let tasks = [];

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/addTask", (req, res) => {
  const newTask = req.body.task;
  tasks.push({ id: Date.now(), Text: newTask });
  console.log(tasks);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  res.render("edit", { task });
});

app.post("/edit/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedText = req.body.task;
  const tasks = tasks.find((task) => task.id === taskId);

  if (task) {
    task.text = updatedText;
  }

  res.redirect("/");
});

app.listen(3000);
