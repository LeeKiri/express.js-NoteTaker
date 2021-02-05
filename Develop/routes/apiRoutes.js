const notes = require("./db/db.json");
const uniqid = require("uniqid");
const fs = require("fs");

// ROUTING

module.exports = (app) => {
  //gets the notes from the user input
  app.get("/api/notes", (req, res) => res.json(notes));

  //stores the new data in body and gives it a unique id
  app.post("/api/notes", (req, res) => {
    let data = req.body;
    let newNote = {
      id: uniqid(),
      title: data.title,
      text: data.text,
    };

    //adds the new user to the db.json file array
    notes.push(newNote);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("Updated note");
      return newNote;
    });
  });

  //gets the deleted notes id from the browser
  async function deleteNote() {
    await app.delete("/api/notes/:id", (req, res) => {
      let deleteId = req.params.id;
      console.log(deleteId);

      //reads the db.json file and saves the current version as newFile
      fs.readFile(__dirname + "/db/db.json", (err) => {
        if (err) throw err;
        let fileNotes;
        fileNotes = JSON.parse(notes);
        console.log(fileNotes);
      });

      let newFile = JSON.stringify(
        fileNotes.filter((note) => note.id !== deleteId)
      );

      //rewrites the db.json file with the deleted user removed
      fs.writeFile(__dirname + "/db/db.json", newFile, (err) => {
        if (err) throw err;
        console.log("Updated note");
      });
      res.send("Note deleted");
    });
  }
  deleteNote();
};

