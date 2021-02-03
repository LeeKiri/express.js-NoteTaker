const notes = require("./db/db.json");
const uniqid = require("uniqid");
const fs = require("fs");
// ROUTING

module.exports = (app) => {
  app.get("/api/notes", (req, res) => res.json(notes));

  app.post("/api/notes", (req, res) => {
    //get new note saved to req.body, give it a unique id. pass it to the db/json
    //then return the new note to the client html
    let data = req.body;
    let newNote = {
      id: uniqid(),
      title: data.title,
      text: data.text,
    };
    notes.push(newNote);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("Updated note");
      return newNote;
    });
  });
};
