const express = require("express");
const app = express();
const body_parser = require("body-parser");
const conn = require("./connection");

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  var sql = `select * from tasks`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/insert", (req, res) => {
  var name = req.body.name;
  console.log(name);
  var sql = `INSERT INTO tasks (name) VALUES ("${name}")`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    // res.redirect("/");
    res.send("record inserted successfully");
  });
});

app.put("/update/:id", (req, res) => {
  let name = req.body.name;
  let id = req.params.id;
  let data = [name, id];
  conn.query(
    "UPDATE tasks SET name = ? WHERE id = ?",
    data,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        res.send("Updated successfully", results);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  let query = "DELETE FROM tasks WHERE id = ?";
  conn.query(query, +id, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send("Deleted successfully");
    }
  });
});

app.listen(7000);
