let notes = [];
const uniqid = require("uniqid");
const fs = require("fs");

// ROUTING

module.exports = (app) => {
  //gets the notes from the user input
  app.get("/api/notes", (req, res) => {
    notes = JSON.parse(fs.readFileSync("./routes/db/db.json", "utf8"));
    res.json(notes)
  });

  //stores the new data in body and gives it a unique id
  app.post("/api/notes", (req, res) => {
    let data = req.body;
    let newNote = {
      id: uniqid(),
      title: data.title,
      text: data.text,
    };
    notes = JSON.parse(fs.readFileSync("./routes/db/db.json", "utf8"));
    //adds the new user to the db.json file array
    notes.push(newNote);
    console.log(notes)
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("Updated note");
       res.json(notes);
    });
  });

  //gets the deleted notes id from the browser

  app.delete("/api/notes/:id", async (req, res) => {
    let deleteId = req.params.id;
    console.log(deleteId);
    let fileNotes;

    //reads the db.json file and saves the current version as newFile
    fileNotes = JSON.parse(fs.readFileSync("./routes/db/db.json", "utf8"));
    console.log(fileNotes)

    let newFile = fileNotes.filter((note) => note.id !== deleteId)
   

    //rewrites the db.json file with the deleted user removed
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(newFile));
    res.send("Note deleted");
  });
};
